/**
 * Created by Mortoni on 19/11/13.
 *
 * configuration data
 */
module.exports = {
  port: 3000,
  polltime: 4,
  timecount: 60,
  feeds :  [
        { title: "neverno", 
            type : "json", 
            url: 'http://storyskynews.never.no/xml/feed/story_dev.json'
        }
    ]
};