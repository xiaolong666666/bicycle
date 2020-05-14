export default {
    formatDate(time){
        if(!time) return '';
        let mydate = new Date(time);
        let month = mydate.getMonth() > 8 ? (mydate.getMonth() + 1) : '0' + (mydate.getMonth() + 1);
        let date = mydate.getDate() > 9 ? mydate.getDate() : '0' + mydate.getDate();
        let hours = mydate.getHours() > 9 ? mydate.getHours() : '0' + mydate.getHours();
        let minutes = mydate.getMinutes() > 9 ? mydate.getMinutes() : '0' + mydate.getMinutes();
        let seconds = mydate.getSeconds() > 9 ? mydate.getSeconds() : '0' + mydate.getSeconds();
        return mydate.getFullYear() + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds
    }
}