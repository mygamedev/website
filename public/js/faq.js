(function () {
  'use strict';

  var faq = (function (){

    var colors = [  {head: "#CA6E7B", body: "#EDAEAE"},
                    {head: "#9E4969", body: "#CE94A6"},
                    {head: "#784B7E", body: "#CDB5D3"},
                    {head: "#4B487E", body: "#ACA5D1"},
                    {head: "#223967", body: "#96BADB"},
                    {head: "#007391", body: "#8EC1C9"},
                    {head: "#69ACB7", body: "#C4DFE3"},
                    {head: "#FAB58F", body: "#FEE3D3"},
                    {head: "#CA6E7B", body: "#EDAEAE"},
                    {head: "#9E4969", body: "#CE94A6"},
                    {head: "#4B487E", body: "#ACA5D1"},
                    {head: "#007391", body: "#8EC1C9"},
                    {head: "#8EB57A", body: "#E8E9C5"}  ];

    function replaceAll(find, replace, string) {
      var find = find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      return string.replace(new RegExp(find, 'g'), replace);
    }

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function createContent(contents) {
      var result = '';
      contents.forEach(function (content) {
        result = result + '<p>' + content + '</p>'
      });
      return result;
    }

    function getRandomAvatarIMG() {
      return '<img ' +
             'style="width: 220px;" ' +
             'src="img/faq/faq_avatar_' + getRandomInt(1,5) + '.svg" ' +
             '/>';
    }

    return function (faqTitle, faqContents, colorIdx) {

      faqTitle = faqTitle.toUpperCase();

      var headId    = "head" + replaceAll(' ', '', replaceAll('?', '', replaceAll(',', '', faqTitle))),
          bodyId    = "body" + replaceAll(' ', '', replaceAll('?', '', replaceAll(',', '', faqTitle))),
          content   = createContent(faqContents),
          colorPair = colors[colorIdx];

      var elem = '<div id="' + headId + '" name="gamedevelopment" class="titlebar" style="background-color: ' + colorPair.head + '; margin-left: -15px; margin-right: -15px;" role="tab">'
                 + '<h4 class="text-center" style="margin-top:0px; margin-bottom:0px; padding-bottom: 15px; padding-top: 40px;" data-toggle="collapse" data-parent="#accordion" href="#' + bodyId + '" aria-expanded="false" aria-controls="collapseTwo">'
                   + '<a style="color: white; font-size: 18px; font-family: \'Avenir\', sans-serif; text-decoration: none;">' + faqTitle + '</a>'
                   + '<br/>'
                   + '<img style="height: 10px; margin-top: 16px;" src="img/faq/faq_down_arrow.svg" />'
                 + '</h4>'
               + '</div>'

               + '<div id="' + bodyId + '" class="collapse" style="background-color: ' + colorPair.body + '; margin-left: -15px; margin-right: -15px;" role="tabpanel", aria-labelledby="' + headId + '" >'
                 + '<div class="row" style="padding-top:40px; padding-bottom:40px;max-width: 900px; margin: 0 auto;">'
                   + '<div class="col-sm-4 text-center" style="padding-bottom: 20px;">' + getRandomAvatarIMG() + '</div>'
                   + '<div class="col-sm-8" style="color: #223967; font-size: 16px; font-family: \'Avenir\', sans-serif;">' + content + '</div>'
                 + '</div>'
               + '</div>';

      $('#accordion').append(elem);
      return "head" + replaceAll(' ', '', replaceAll('?', '', replaceAll(',', '', faqTitle)));
    }
  }());

  // GAME DEVELOPMENT
  faq('What is Game Development?', [
    'The term ‘Game Development’ is used to describe the processes, techniques, theories, and practices related to the creation of digital interactive multimedia applications that incorporates the element of entertainment or in simpler terms; digital games.',
    'Game Development is a process that involves interdisciplinary cooperation of technical disciplines like software engineering, and creative disciplines like art and music, to implement a game design in a playable real-world format. This involves a fusion of three major disciplines: Game Technology, Game Art, and Game Design.'
  ], 0);

  faq('What is the difference between Game Art, Game Design, and Game Technology?', [
    'Though every aspect in the game developing process is important, the first factor that a game will be judged on are its graphics. This is where game artists come into play. Game artists specialize in the creation of everything visual in the game, from characters to the interface.',
    'Game Design is the art of crafting experiences, thus the job of a game designer is to transform a game idea into a reality. This specialization teaches students the fields of game mechanics, game-play, game balancing, and level design.', 'Last but not least, Game Technology; the dazzling special effects, intriguing dialogues, even the enjoyable game-play system, are bound together by strict and complex lines of code. These codes govern how the game functions, when certain sounds are meant to happen, and more importantly, makes the game play smoothly.'
  ], 1);



  // THE GAMES INDUSTRY
  faq('How big is the global Games Industry?', [
    'Video Games is one of the fastest growing industries in the world economy. For almost as long as computers existed, there have been people intent on playing computer games. Since young programmers at the Massachusetts Institute of Technology came up with “Spacewar!” some 50 years ago, the video games world has exploded into a multibillion-dollar industry.',
    'Gartner Technology Research predicts the worldwide video game market combining console, online, mobile and personal computer offerings will expand from $101B in 2014 to $111B by 2015 and top $128B in 2017. That’s a significant increase from 2012, when revenues reached only $78.8B. The rise in revenue is seen on every platform, including consoles, handhelds, mobile, and PC.',
    'To put this into context - In September 2013, Take-Two Interactive\'s Grand Theft Auto 5 crossed $1B in sales in just three days, making it fastest selling property across all forms of entertainment. To put that into context across other forms of entertainment, the global music industry sees less than $1.4B in record and song sales each month.',
    'In 2009, Minecraft was conceptualized by a mild-mannered amateur programmer in Sweden who left his job to create the game on his bedroom computer. In 2011, Minecraft passed the 1 million mark on purchases, less than a month after entering its beta phase. There are 4.5 million YouTube hits about a game that had no marketing budget. By early 2013 Minecraft has sold 12 million copies for PCs. That makes it the fifth bestselling PC game of all time in less than two years. To date, nearly 54 million copies have been sold. On September 15, 2014, Microsoft bought Minecraft for $2.5B.'
  ], 2);
  faq('How big is the Game Development Industry in Malaysia and Southeast Asia?', [
    'The landscape of games development is not new in Malaysia. Not many Malaysians are aware but Malaysia has been involved in Game Development since the early 90s when several Malaysian companies were contracted for out-sourcing work on various Game platforms.',
    'Even now, several notable names in Game Development are established in the Southeast Asian Region; Codemasters Studios has a local Malaysian studio which handles the artwork for some of their biggest titles including Dirt3, Operation Flashpoint 2, and F1 2012.',
    'Streamline Studios, an independent Dutch outsourcing and game development studio has also set-up office right in the heart of Kuala Lumpur. Streamline Studios has been providing high-quality content for all platforms and genre’s within the video games industry. Streamline’s work has been featured in several platinum selling hits including Gears of War, Unreal Tournament, and Ghost Recon.',
    'Of course, there are many local companies as well. Did you know that the artwork for games such as Sonic & SEGA All-Stars Racing (2010) by SEGA, and Afro Samurai (2009) by Namco Bandai Games America, were done by Malaysian companies?',
    'In late 2014, the Singaporean-based Fatfish Internet Group acquired a majority stake in Appxplore, a local independent games studio responsible for the development of Alien Hive, a sliding tile puzzle game. This game has surpassed 1.5 million downloads to date.',
    'Further south, in Singapore; Ubisoft, arguably the top three leading international game developer, publisher and distributor, is based there. The company has a worldwide presence with 29 studios in 19 countries and subsidiaries in 26 countries. As of now, it is the third largest independent game publisher in Europe, and the third largest in the United States. The company\'s largest development studio is Ubisoft Montreal, which currently employs more than 2,100 people.'
  ], 3);
  faq('How many game companies are there in Malaysia', [
    'There are about 40 game studios in Malaysia comprising of independent game studios, large outsourcing studios, and international game company subsidiary studios. Amongst the international game studios are Codemasters Studios from the UK, Streamline Studios from the Netherlands, Big Ant Studios from Australia, and Polyassets United from Japan.'
  ], 4);
  faq('Why do we need a critical mass of skilled talents?', [
    'The primary measure of success in a digital game region is a critical mass of game developers.  Achieving a certain volume of workers provides a region with the necessary scale to make other key success factors like incubation, knowledge transfer and a sustainable ecosystem attainable. Without critical mass, it is difficult to find support, retain talent, and attract international visibility and credibility.'
  ], 5);



  // STUDENTS & PARENTS
  faq('Why study Electronic Games?', [
    'Electronic Games is one of the fastest growing industries in the world and the number of people playing games is growing exponentially due to casual games and better user interfaces.',
    'An industry study conducted on the worldwide video game industry has predicted that the video game boom will continue through to 2012, with total sales soaring to $68.4 billion by the end of 2012. are there more recent statistics? 2012 was 2 years ago',
    'As more consumers pick up a controller, the video game industry shows no signs of slowing down. In fact, with a projected compound annual growth rate at an estimated 10.3%, Electronic Games will clearly outpace almost every other form of entertainment, movies and music included.',
    'As such, the demand for such high-level skills will only grow in the years ahead.'
  ], 6);
  faq('Could a game development degree lead to developing anti-social habits? Or encourage gaming addiction?', [
    'Gaming, and the people who play and/or develop them, are somewhat misunderstood.',
    'Game development is not just about game development for entertainment purposes. Games have been used as teaching aids for a number of years, and the skills learned can be applied to any number of disciplines including simulation exercises, strategic planning and management.'
  ], 7);
  faq('How much do fresh graduates get paid?', [
    'It would really depend on how good you are – portfolio counts. Entry level salaries for Game Artist, Programmers or Designers would be around RM2200-2400 for a fresh degree graduate but some companies have been known to pay up to RM2800 for a really talented 3D artist or gifted programmer. Junior artists and programmers with 1-2 years of experience should be able to command a range around RM2800 to RM3500 depending on scope and project (as well as the studio).'
  ], 8);

}());