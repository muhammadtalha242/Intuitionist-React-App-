exports.getRefYear=(date_1, date_2)=> {
    const difference =((date_2.getFullYear() - date_1.getFullYear()) * 12) + (date_2.getMonth() - date_1.getMonth());

    if (difference < 0) {
        refYear = 0
    }
    else if ((difference => 0) && (difference < 12)) {
      refYear = 1
    }
    else if (difference => 12) {
        if (difference % 12 > 0) {
            refYear = Math.floor(difference / 12) +1 
        }
        else if (difference % 12 == 0) {
            refYear = Math.floor(difference / 12) +1
        }
    }
    return refYear

}
