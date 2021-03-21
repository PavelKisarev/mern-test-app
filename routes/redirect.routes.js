const { Router } = require('express')
const Link = require('../models/Link')
const router = Router()

router.get('/:code', async (req, res) => {
    try {
        console.log(req.params.code)
        console.log(Link)
        const link = await Link.findOne({ code: req.params.code })
        if (link) {
            link.clicks++
            await link.save()
            res.redirect(link.from)
            // res.redirect('http://google.com')
        }

        res.status(404).json("Link Not found")
    } catch (e) {
        res.status(500).json({ message: "Something went wrong on server!" })
    }
})

// router.get('/:abc', async (req, res) => {
//     console.log(req.params.abc)
//     res.redirect('http://google.com')
// })

module.exports = router