const getters = {
    getAllPost: (state) => state.post.posts,
    getUser: (state) => state.user.userInfo,
    getTeachers: (state) => state.user.teachers,
    getAllFaculties: (state) => state.faculty.faculties,
    getInfoFaculty: (state) => state.faculty.infoFaculty,
    getAllNotify: (state) => state.notify.listNotify,
    getNotifyByFaculty: (state) => state.notify.listNotify,
    getNotifyDetail: (state) => state.notify.notifyDetail,
    getUnread: (state) => state.notify.unread,
};

export default getters;
