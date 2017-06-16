const Announcement = require('../models').Announcement;

let self = {

    /** Find all announcements **/
    findAll() {
        return new Promise((resolve, reject) => {
            Announcement.findAll({
                where: {
                    deleted: null
                }
            })
                .then(announcements => resolve(announcements))
                .catch(error => reject(self.logError(error)));
        });
    },

    /** Create an announcement **/
    create(announcementJson) {
        return new Promise((resolve, reject) => {
            Announcement.create(announcementJson)
                .then(announcement => resolve(announcement))
                .catch(error => reject(self.logError(error)));
        });
    },

    /** Update an existing announcement **/
    update(announcementId, announcementJson) {
        return new Promise((resolve, reject) => {
            Announcement.findOrCreate({
                where: {
                    announcementId: announcementId,
                    deleted: null
                },
                defaults: announcementJson
            })
                .spread((announcement, created) => {
                    if (!created) {
                        announcement.updated = new Date();
                        announcement.updatedBy = 0;

                        for (let key in announcementJson) {
                            if (announcementJson.hasOwnProperty(key) &&
                                key !== 'announcementId' &&
                                announcement[key] !== announcementJson[key]) {

                                announcement[key] = announcementJson[key];
                            }
                        }

                        announcement.save()
                            .then(announcement => resolve(announcement))
                            .catch(error => reject(self.logError(error)));
                    }
                })
                .catch(error => reject(error));
        });
    },

    /** Delete an announcement **/
    delete(announcementId) {
        return new Promise((resolve, reject) => {
            Announcement.destroy({
                where: {
                    announcementId: announcementId
                },
            })
                .then(() => resolve())
                .catch(error => reject(self.logError(error)));
        });
    },

    /** Log errors to the console **/
    logError(error) {
        console.error(error);
        return error;
    }
};

module.exports = self;