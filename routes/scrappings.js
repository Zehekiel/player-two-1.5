var express = require('express');
var router = express.Router();
const request = require('sync-request')
var cheerio = require('cheerio');




/*       ARTICLES        */
router.get('/articles', async function(req, res, next) {

    var result = request('GET' , 'https://www.gamekult.com/actualite.html')
  
    var articles = []
  
    if(result.statusCode < 300){
      const $ = cheerio.load(result.body)
      $('.ed__news-h__mdb').each(function(){
  
        let title = $(this).find('.gk__helpers__fat-title-m').text()
        title = title.substring(17, title.length -13)
  
        let subTitle = $(this).find('.gk__helpers__subtitle-s').text()
  
        let image = $(this).find('img').data('src')
  
        if(image === undefined){
          image = $(this).find('img').attr('src')
        }
      
        let link = $(this).find('a').attr('href')
        link = `https://www.gamekult.com${link}`
  
        articles.push({title, subTitle, image, link})
      })
    }
    res.json({articles});
  });



/*       POPULAR GAMES        */
router.get('/popularGames', async function(req, res, next) {

  var result = request('GET' , 'https://www.gamekult.com/jeux/les-plus-populaires.html')

  var games = []

  if(result.statusCode < 300){
    const $ = cheerio.load(result.body)
    $('.pr__game-h__mdb').each(function(){

      let title = $(this).find('.pr__game-h__mdb__details__title').text().replace(/\s+/g, " ")

      let category = $(this).find('.pr__game-h__mdb__details__category').text().replace(/\s+/g, " ")
      
      let detailsCompany = $(this).find('.pr__game-h__mdb__details__company').text().replace(/\s+/g, " ")

      let tag = $(this).find('.pr__game-h__mdb__details__tag').text().replace(/\s+/g, "-")

      let image = $(this).find('img').data('src')

      let link = $(this).find('a').attr('href')
          link = `https://www.gamekult.com${link}`

      games.push({title, category, detailsCompany, tag, image, link})
    })
  }
  res.json({games});
});


/*       MON FIL D'ACTUALITÉ        */
router.get('/myArticles', async function(req, res, next) {

  var result = request('GET' , 'https://www.gamekult.com/actualite.html')

  var myArticles = []

  if(result.statusCode < 300){
    const $ = cheerio.load(result.body)
    $('.ed__news-h__mdb').each(function(){

      let title = $(this).find('.gk__helpers__fat-title-m').text()
      title = title.substring(17, title.length -13)

      let subTitle = $(this).find('.gk__helpers__subtitle-s').text()

      let image = $(this).find('img').data('src')

      if(image === undefined){
        image = $(this).find('img').attr('src')
      }
    
      let link = $(this).find('a').attr('href')
      link = `https://www.gamekult.com${link}`

      myArticles.push({title, subTitle, image, link})
    })
  }
  res.json({myArticles});
});



  module.exports = router;