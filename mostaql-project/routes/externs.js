const express = require('express')
const router = express.Router();
const { Home } = require('../Database-admin/Home')
const { Extern } = require('../Database-admin/Extern')
const { Email } = require('../Database-admin/Email')
const { Feature } = require('../Database-admin/Feature')
const { Termes } = require('../Database-admin/Termes')
const { Member } = require('../Database-admin/Member')
const { Moto } = require('../Database-admin/Moto')
const { Code } = require('../Database-admin/Code')
const upload = require('../middelware/upload')
const uploadArray = require('../middelware/uploadArray')
const { validationResult } = require('express-validator');
const { body } = require('express-validator');
var formidable = require('formidable')
var fileSystem = require('fs')
var { getVideoDuration } = require('get-video-duration');
const { Line } = require('../Database-admin/Line');
const videoUpload = require('../middelware/uploadVideo')

// router.post('/add-image',uploadArray.array('avatar', 12), async (req, res, next) => {

// let imagesPaths = [];

// for (avatar of req.files) {
//   imagesPaths.push(avatar.path.split('\\')[1]);
// }


//     const image = new Home({
//         avatar: imagesPaths
//     })
//     await image.save();
//     res.status(201).json({ message: "add new just image", imageId: image._id })

// })

// router.post('/add-video',videoUpload.single('video'), async (req, res, next) => {

//     const video = new Home({
//         video: req.file.path.split('\\')[1]
//     })

//     await video.save();
//     res.status(201).json({ message: "add new just video", videoId: video._id })

// })

router.post('/add-image', upload.single('avatar'), async (req, res, next) => {

    const image = new Home({
        avatar: req.file.path.split('\\')[1]
    })
    await image.save();
    res.status(201).json({ message: "add new just image", imageId: image._id })

})
router.get('/get-image', async (req, res, next) => {
    const image = await Home.find();
    if (!image) {
        const err = new Error('not found image');
        next(err);
        return;
    }
    res.status(200).json({ image })
})

router.post('/delete-image/:imageId', async (req, res, next) => {

    const imageId = req.params.imageId;
    const image = await Home.findOne({ _id: imageId });
    if (!image) {
        const error = new Error('Could not find image.');
        error.statusCode = 404;
        throw error;
    }
    await image.deleteOne({ _id: imageId })
    res.status(200).json({ message: 'delete fetched image.', image });
})

/*--------------------------------------------------*/
router.post('/add-tax', async (req, res, next) => {

    const tax = new Extern({
        tax: req.body.tax
    })

    await tax.save();
    res.status(201).json({ message: "add new just tax", taxId: tax._id })

})
/*--------------------------------------------------*/
router.post('/update-tax/:taxId', async (req, res, next) => {

    const taxId = req.params.taxId;
    const tax = req.body.tax;

    try {
        const taxsearch = await Extern.findById(taxId);
        if (!taxsearch) {
            console.log('not found')
        }
        taxsearch.tax = tax;

        await taxsearch.save();


        res.status(201).json({ message: 'News updated!' });
    } catch (e) {
        res.status(201).json({ message: e.message, code: e.statusCode });
    }

})
/**///////////////////////////////////////////////// */
router.post('/add-cobone', async (req, res, next) => {

    const coboneFind = await Extern.findOne({ coboneName: req.body.coboneName });
    if (coboneFind) {
        const error = new Error('this cobone is exist.');
        error.statusCode = 404;
        throw error;
    }
    const cobone = new Extern({
        coboneName: req.body.coboneName,
        cobonePourcent: req.body.cobonePourcent
    })
    await cobone.save();
    res.status(201).json({ message: "add new just cobnone", coboneId: cobone._id })
})


router.post('/delete-cobone/:coboneId', async (req, res, next) => {

    const coboneId = req.params.coboneId;
    const cobone = await Extern.findOne({ _id: coboneId });
    if (!cobone) {
        const error = new Error('Could not find cobone.');
        error.statuscobone = 404;
        throw error;
    }
    await cobone.deleteOne({ _id: coboneId })
    res.status(200).json({ message: 'delete fetched cobone.', cobone });
})

router.get('/get-extern', async (req, res, next) => {
    const extern = await Extern.find();
    if (!extern) {
        const err = new Error('not found extern');
        next(err);
        return;
    }
    res.status(200).json({ extern })
})

router.post('/get-one-cobone',
    [
        body('coboneName')
            .trim()
    ]
    , async (req, res, next) => {
        const coboneUser = await Extern.find(coboneName = req.body)
        if (!coboneUser) {
            const err = new Error('not found cobone-one');
            next(err);
            return;
        }
        res.status(200).json({ coboneUser })
    })


/**///////////////////////////////////////////////// */

router.post('/add-email', [

    body('email')
        .trim().isLength({ min: 5, max: 44 }).isEmail()
        .withMessage('Please enter a valid email.'),

],
    async (req, res, next) => {
        const errors = validationResult(req);
        try {
            if (!errors.isEmpty()) {
                const error = new Error('Validation failed.');
                error.statusCode = 422;
                error.data = errors.array();
                throw error;
            }
            const email = new Email({
                email: req.body.email,
            })

            await email.save();
            res.status(201).json({ message: "add new just email", emailId: email._id })
        }
        catch (err) {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        }
    })

router.get('/get-email', async (req, res, next) => {
    const email = await Email.find();
    if (!email) {
        const err = new Error('not found email');
        next(err);
        return;
    }
    res.status(200).json({ email })
})


/**///////////////////////////////////////////////// */

router.post('/add-feature', [

    body('title')
        .trim().isLength({ min: 5, max: 44 }).isString()
        .withMessage('Please enter a valid title.'),
    body('text')
        .trim().isLength({ min: 5, max: 1024 }).isString()
        .withMessage('Please enter a valid text.'),
],
    async (req, res, next) => {
        const errors = validationResult(req);
        try {
            if (!errors.isEmpty()) {
                const error = new Error('Validation failed.');
                error.statusCode = 422;
                error.data = errors.array();
                throw error;
            }
            const feature = new Feature({
                title: req.body.title,
                text: req.body.text
            })

            await feature.save();
            res.status(201).json({ message: "add new just feature", featureId: feature._id })
        }
        catch (err) {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        }
    })


router.get('/get-feature', async (req, res, next) => {
    const feature = await Feature.find();
    if (!feature) {
        const err = new Error('not found feature');
        next(err);
        return;
    }
    res.status(200).json({ feature })
})

router.post('/update-feature/:featureId', async (req, res, next) => {

    const featureId = req.params.featureId;
    const title = req.body.title;
    const text = req.body.text;

    try {
        const feature = await Feature.findById(featureId);
        if (!feature) {
            const error = new Error('Could not find feature.');
            error.statusCode = 404;
            throw error;
        }
        feature.title = title;
        feature.text = text;

        await feature.save();


        res.status(201).json({ message: 'News updated!' });
    } catch (e) {
        res.status(201).json({ message: e.message, code: e.statusCode });
    }

})

/**/////////////////////////////////////////////////** */

router.post('/add-Termes', [

    body('terme')
        .trim().isLength({ min: 5, max: 44 }).isString()
        .withMessage('Please enter a valid title.'),
    body('content')
        .trim().isLength({ min: 5, max: 3000 }).isString()
        .withMessage('Please enter a valid text.'),
],
    async (req, res, next) => {
        const errors = validationResult(req);
        try {
            if (!errors.isEmpty()) {
                const error = new Error('Validation failed.');
                error.statusCode = 422;
                error.data = errors.array();
                throw error;
            }
            const terme = new Termes({
                terme: req.body.terme,
                content: req.body.content
            })

            await terme.save();
            res.status(201).json({ message: "add new just terme", termeId: terme._id })
        }
        catch (err) {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        }
    })


router.get('/get-termes', async (req, res, next) => {
    const termes = await Termes.find();
    if (!termes) {
        const err = new Error('not found termes');
        next(err);
        return;
    }
    res.status(200).json({ termes })
})

router.post('/update-termes/:termesId', async (req, res, next) => {

    const termesId = req.params.termesId;
    const title = req.body.title;
    const content = req.body.content;

    try {
        const terme = await Termes.findById(termesId);
        if (!terme) {
            const error = new Error('Could not find terme.');
            error.statusCode = 404;
            throw error;
        }
        terme.terme = title;
        terme.content = content;

        await terme.save();


        res.status(201).json({ message: 'News updated!' });
    } catch (e) {
        res.status(201).json({ message: e.message, code: e.statusCode });
    }

})

router.post('/delete-terme/:termeId', async (req, res, next) => {

    const termeId = req.params.termeId;
    const terme = await Termes.findOne({ _id: termeId });
    if (!terme) {
        const error = new Error('Could not find terme.');
        error.statusCode = 404;
        throw error;
    }
    await terme.deleteOne({ _id: termeId })
    res.status(200).json({ message: 'delete fetched terme.', terme });
})


/**/////////////////////////////////////////////////** */

router.post('/add-member', upload.single('avatar'), [

    body('name')
        .trim().isLength({ min: 5, max: 44 }).isString()
        .withMessage('Please enter a valid title.'),
    body('content')
        .trim().isLength({ min: 5, max: 3000 }).isString()
        .withMessage('Please enter a valid text.'),
],
    async (req, res, next) => {
        const errors = validationResult(req);
        try {
            if (!errors.isEmpty()) {
                const error = new Error('Validation failed.');
                error.statusCode = 422;
                error.data = errors.array();
                throw error;
            }
            const member = new Member({
                avatar: req.file.path.split('\\')[1],
                name: req.body.name,
                content: req.body.content
            })

            await member.save();
            res.status(201).json({ message: "add new just member", memberId: member._id })
        }
        catch (err) {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        }
    })

router.get('/get-members', async (req, res, next) => {
    const member = await Member.find();
    if (!member) {
        const err = new Error('not found member');
        next(err);
        return;
    }
    res.status(200).json({ member })
})


router.post('/delete-member/:memberId', async (req, res, next) => {

    const memberId = req.params.memberId;
    const member = await Member.findOne({ _id: memberId });
    if (!member) {
        const error = new Error('Could not find member.');
        error.statusCode = 404;
        throw error;
    }
    await member.deleteOne({ _id: memberId })
    res.status(200).json({ message: 'delete fetched member.', member });
})
// *************************************************** // 


router.post('/add-line', [

    body('title')
        .trim().isLength({ min: 2, max: 44 }).isString()
        .withMessage('Please enter a valid title.'),
    body('content')
        .trim().isLength({ min: 5, max: 1024 }).isString()
        .withMessage('Please enter a valid text.'),
],
    async (req, res, next) => {
        const errors = validationResult(req);
        try {
            if (!errors.isEmpty()) {
                const error = new Error('Validation failed.');
                error.statusCode = 422;
                error.data = errors.array();
                throw error;
            }
            const line = new Line({
                title: req.body.title,
                content: req.body.content,
                date: req.body.date
            })

            await line.save();
            res.status(201).json({ message: "add new just line", lineId: line._id })
        }
        catch (err) {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        }
    })


router.get('/get-line', async (req, res, next) => {
    const line = await Line.find();
    if (!line) {
        const err = new Error('not found line');
        next(err);
        return;
    }
    res.status(200).json({ line })
})

router.post('/delete-line/:lineId', async (req, res, next) => {

    const lineId = req.params.lineId;
    const line = await Line.findOne({ _id: lineId });
    if (!line) {
        const error = new Error('Could not find line.');
        error.statusCode = 404;
        throw error;
    }
    await line.deleteOne({ _id: lineId })
    res.status(200).json({ message: 'delete fetched line.', line });
})

//* ***************************************************** ---// 
router.post('/add-moto', upload.single('avatar'), async (req, res, next) => {

    const moto = new Moto({
        title: req.body.title,
        content: req.body.content,
        avatar: req.file.path.split('\\')[1],
    })

    await moto.save();
    res.status(201).json({ message: "add new just moto", motoId: moto._id })

})

router.get('/get-moto', async (req, res, next) => {
    const moto = await Moto.find();
    if (!moto) {
        const err = new Error('not found moto');
        next(err);
        return;
    }
    res.status(200).json({ moto })
})
router.post('/delete-moto/:motoId', async (req, res, next) => {

    const motoId = req.params.motoId;
    const moto = await Moto.findOne({ _id: motoId });
    if (!moto) {
        const error = new Error('Could not find moto.');
        error.statusCode = 404;
        throw error;
    }
    await moto.deleteOne({ _id: motoId })
    res.status(200).json({ message: 'delete fetched moto.', moto });
})
// /**************************/*/*/* */
router.post('/add-code', async (req, res, next) => {

    const codeFind = await Code.findOne({ codeName: req.body.codeName });
    if (codeFind) {
        const error = new Error('this code is exist.');
        error.statusCode = 404;
        throw error;
    }
    const code = new Code({
        codeName: req.body.codeName,
    })
    await code.save();
    res.status(201).json({ message: "add new just code", codeId: code._id })
})
router.get('/get-code', async (req, res, next) => {
    const code = await Code.find();
    if (!code) {
        const err = new Error('not found code');
        next(err);
        return;
    }
    res.status(200).json({ code })
})
router.post('/get-one-code',
    [
        body('codeName')
            .trim()
    ]
    , async (req, res, next) => {
        const code = await Code.findOne(codeName = req.body)
        if (!code) {
            const err = new Error('not found code-one');
            next(err);
            return;
        }
        res.status(200).json({ code })
    })

router.post('/delete-code/:codeId', async (req, res, next) => {

    const codeId = req.params.codeId;
    const code = await Code.findOne({ _id: codeId });
    if (!code) {
        const error = new Error('Could not find code.');
        error.statusCode = 404;
        throw error;
    }
    await code.deleteOne({ _id: codeId })
    res.status(200).json({ message: 'delete fetched code.', code });
})
module.exports = router;
