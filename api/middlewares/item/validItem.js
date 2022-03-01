module.exports = (req, res, next) => {
    try {
        if(!req.body){ throw new Error('Missing body'); }
        if(!req.body.item){ throw new Error('Missing item object'); }
        if( !req.body.item.name || req.body.item.name.length < 1) throw new Error('Missing item name');
        if( !req.body.item.content || req.body.item.content.length < 1 || req.body.item.content.length > 1000) throw new Error('Missing or invalid item content');
        next();

    } catch (e) {
        res.status(401).json({
            error: e.message || 'Une erreur est survenue'
        });
    }
}