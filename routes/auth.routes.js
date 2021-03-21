const { Router } = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const validator = require('express-validator')
const bodyParser = require('body-parser')


const urlencodedParser = bodyParser.urlencoded({ extended: false })

const router = Router()

// / api / auth / registration
router.post(
    '/registration',
    [
        validator.check('email', 'некорректный email').isEmail(),
        validator.check('password', 'Слабый пароль').isLength({ min: 6 })
    ],
    async (req, res) => {
        try {
            const errors = validator.validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при регистрации'
                })
            }

            console.log("BODY REQUEST", req.body)
            const { email, password } = req.body

            const candidate = await User.findOne({ email })

            if (candidate) {
                res.status(400).json({ message: 'такой пользовтель уже есть' })
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const newUser = new User({ email, password: hashedPassword })

            await newUser.save()

            res.status(201).json({ message: 'Пользователь добавлен в базу данных' })

        } catch (e) {
            // res.status(500).json({ message: "Something went wrong on server!" })
        }
    })

// /api/auth/login
router.post(
    '/login',
    // [
    //     validator.check('email', 'Введите корректный email').normalizeEmail().isEmail(),
    //     validator.check('password', 'Введите пароль').exists
    // ],
    urlencodedParser,
    async (req, res) => {

        try {
            const errors = validator.validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при логине'
                })
            }

            const { email, password } = req.body

            const user = await User.findOne({ email })

            if (!user) {
                return res.status(400).json({ message: 'Такого пользователя не нашлось' })
            }

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).json({ message: 'пароль не совпадает' })
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                { expiresIn: '1d' }
            )

            res.status(200).json({ token, userId: user.id })

        } catch (e) {
            res.status(500).json({ message: "Something went wrong on server!" })
        }
    })




module.exports = router