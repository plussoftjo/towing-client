import {point} from '@turf/helpers';
import distance from '@turf/distance';

const helper = {
    point_distance:function(from,to) {
        var from_points = point([from[0], from[1]]);
        var to_points = point([to[0], to[1]]);
        return distance(from_points, to_points);
    },
    check_values:function(values) {
        let error = 0;
        values.forEach((trg) => {
            if(trg == '') {
                error = error + 1;
            }
        });
        return error == 0?true:false;
    },
    sortByKey:function(array, key) {
        return array.slice().sort(function(a, b) {
            var x = a[key]; var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }
};

export default helper;