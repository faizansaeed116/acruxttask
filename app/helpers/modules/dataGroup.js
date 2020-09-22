module.exports = function groupby(DataList, GroupKeys) {

    if (DataList.length > 0) {
        var GroupedData = [];
        var ObjKeys = Object.keys(DataList[0]);

        var excludedKeys = ObjKeys.filter(function (el) {
            return GroupKeys.indexOf(el) < 0;
        });

        DataList.forEach(element => {
            var result2 = GroupedData.filter(function (hero) {
                var count = 0;

                GroupKeys.forEach(key => {
                    if (element[key] == hero[key]) {
                        count++;
                    }
                });

                return (GroupKeys.length == count);
            });

            if (result2.length == 0) {
                var result = DataList.filter(function (hero) {
                    var count = 0;

                    GroupKeys.forEach(key => {
                        if (element[key] == hero[key]) {
                            count++;
                        }
                    });

                    return (GroupKeys.length == count);
                });

                var obj = {};
                GroupKeys.forEach(key => {
                    obj[key] = result[0][key];
                });

                obj.set = [];
                if (excludedKeys.length > 0) {
                    result.forEach(element => {
                        var temp = {};
                        excludedKeys.forEach(keys => {
                            temp[keys] = (element.hasOwnProperty(keys)) ? element[keys] : null;
                        });

                        (obj.set).push(temp);
                    });
                }

                GroupedData.push(obj);
                // console.log(result);
            } else {

            }
        })

        return GroupedData;
    } else {
        return [];
    }

}