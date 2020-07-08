export default function setFlag(res, cnt) {
    const repo = {}

    const reposMain = []
    const reposOther = []

    // console.log(res);
    // console.log(res.length);

    //console.log(res)

    for (let i = 0; i < res.length; i++) {
        if (i < cnt) {
            res[i].main = true
            reposMain.push(res[i])
        }
        else {
            res[i].main = false
            reposOther.push(res[i])
        }

    }

    repo.reposMain = reposMain
    repo.reposOther = reposOther

    //console.log(res)

    return repo

}
