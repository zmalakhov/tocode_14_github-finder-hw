export default function setSortBy(res, sort, sortDir) {


    // console.log(sort);
    // console.log(sortDir);

    // for (let i = 0; i < res.length; i++) {
    //     console.log(res[i].name);
    //     console.log(res[i].stargazers_count);
    // }

    return res.sort((a, b) => {
        let mod = 1
        if (sortDir === 'desc') mod = -1
        if (a[sort] < b[sort]) return -1 * mod
        if (a[sort] > b[sort]) return 1 * mod
        return 0
    })

}
