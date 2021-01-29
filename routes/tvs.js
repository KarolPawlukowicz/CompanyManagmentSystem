const express = require('express')
const Tv = require('./../models/tv')
const router = express.Router()

router.get('/new', (req, res) => {
    res.render('tvs/new', { tv: new Tv() })
})

router.get('/edit/:id', async (req, res) => {
    const tv = await Tv.findById(req.params.id)
    res.render('tvs/edit', { tv: tv })
})

router.get('/:id', async (req, res) => {
    const tv = await Tv.findOne({ id: req.params.id })
    if (tv == null) res.redirect('/')
    res.render('tvs/show', { tv: tv })
})

router.get('/', async (req, res) => {
    const tvs = await Tv.find()
    res.render('tvs/index', { tvs: tvs })
})

router.post('/', async (req, res, next) => {
    req.tv = new Tv()
    next()
}, saveTvsAndRedirect('new'))

router.put('/:id', async (req, res, next) => {
    req.tv = await Tv.findById(req.params.id)
    next()
}, saveTvsAndRedirect('edit'))

router.delete('/:id', async (req, res) => {
    await Tv.findByIdAndDelete(req.params.id)
    res.redirect('/tvs')
})

function saveTvsAndRedirect(path) {
    return async (req, res) => {
        let tv = req.tv
        tv.brandName = req.body.brandName
        tv.model = req.body.model
        tv.inch = req.body.inch
        tv.status = req.body.status
        tv.description = req.body.description

        console.log('udalo sie ' + tv.status)
        try {
            tv = await tv.save()
            console.log('udalo sie ')
            res.redirect(`/tvs/${tv.id}`)
        } catch (e) {
            console.log('nie udalo sie: ' + e)
            res.render(`tvs/${path}`, { tv: tv })
        }
    }
}

module.exports = router