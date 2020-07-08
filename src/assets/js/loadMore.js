export default function loadMore (res, cnt) {
    const repos = []

    // console.log(res);
    // console.log(res.length);


    // > cnt
    if (res.length > cnt){
        for (let i = 0; i < cnt; i++) {
            res[i].main = true
            repos.push(res[i])
        }
    } else {
        for (let i = 0; i < res.length; i++) {
            res[i].main = true
            repos.push(res[i])
        }
    }

    return repos

}
