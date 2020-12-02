let filters = {
    statusFilter(status){
        switch(status){
            case '0':
                return '暂停';
            case '1':
                return '正常';
            default:
                return '';
        }
    }
}

export default filters;