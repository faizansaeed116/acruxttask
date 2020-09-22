module.exports = function groupby2(DataList, GroupBy, Groups) {

    if (DataList.length > 0) {
        var GroupedData = [];
        var ObjKeys = Object.keys(DataList[0]);

        var GroupsKeys = [];
        Groups.forEach(group => {
            group.gkeys.forEach(element => {
                GroupsKeys.push(element);
            });
        });

        DataList.forEach(row => {
            var result2 = GroupedData.filter(function (e1) {
                var count = 0;
                GroupBy.forEach(key => {
                    if (row[key] == e1[key]) {
                        count++;
                    }
                });

                return (GroupBy.length == count);
            });

            if (result2.length == 0) {
                let row_group = {};

                ObjKeys.forEach(key => {
                    if (!GroupsKeys.includes(key)) {
                        row_group[key] = row[key];
                    }
                });

                var grouped_data = DataList.filter(function (e1) {
                    var count = 0;
                    GroupBy.forEach(key => {
                        if (row[key] == e1[key]) {
                            count++;
                        }
                    });

                    return (GroupBy.length == count);
                });

                var group_set = {};

                Groups.forEach(groupSet => {
                    var SetResult = [];
                    grouped_data.forEach(GroupRow => {

                        var result3 = SetResult.filter(function (e1) {
                            var count_2 = 0;
                            groupSet.gkeys.forEach(key_2 => {
                                if (GroupRow[key_2] == e1[key_2]) {
                                    count_2++;
                                }
                            });
                            return (groupSet.gkeys.length == count_2);
                        });

                        if (result3.length == 0) {
                            var GroupRowSet = {};
                            groupSet.gkeys.forEach(setKeys => {
                                GroupRowSet[setKeys] = GroupRow[setKeys];
                            });
                            SetResult.push(GroupRowSet);
                        }
                    });

                    group_set[groupSet.gname] = SetResult;

                });

                row_group.set = group_set;

                GroupedData.push(row_group);
            }
        });

        return GroupedData;
    } else {
        return [];
    }

}