/**
 * Announcement API Tests
 */
const Announcement      = require('../models').Announcement;
const announcementApi   = require('../api/announcement');


/** Find the total number of announcements **/
announcementApi.findAll()
    .then(announcements => console.log('\nTotal Announcements found:', announcements.length))
    .catch(error => console.log(error));


/** Create a temporary announcement **/
announcementApi.create({
    title: 'Sample Announcement 2',
    description: 'This is my second sample announcement!'
})
    .then(announcement => {
        console.log('\nAnnouncement created ::', announcement.dataValues);


        /** Update the temporary announcement **/
        announcementApi.update(announcement.announcementId, {
            title: 'Sample Announcement 3'
        })
            .then(announcement => {
                console.log('\nAnnouncement updated ::', announcement.dataValues);


                /** Delete the temporary announcement **/
                announcementApi.delete(announcement.announcementId)
                    .then(() => console.log('\nAnnouncement deleted. Testing complete!'))
                    .catch(error => console.log(error));
            });
    })
    .catch(error => console.error(error));