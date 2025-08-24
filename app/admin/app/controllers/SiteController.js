
class SiteController {
    async home(req, res, next) {

        
        res.render('home')
         
    }

    
}

module.exports = new SiteController();
