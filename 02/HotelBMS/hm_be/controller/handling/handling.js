const db = require('@/db/index')

exports.getHandlings = async (req, res) => {
    let result = {}
    let pagenum = parseInt(req.query.pagenum) || 1
    let pagesize = parseInt(req.query.pagesize) || 2
    let query = req.query.query
    if(!query) query = ''
    let sql_toshow = ''
    let sql_count = ''
    let total = 0
    let data = {}
    sql_toshow = `call sel_q1_v_page('handling_info_v', 'cname', ?, 1, 1, ?, ?)` 
    sql_count = `select count(*) as count from handling_info_v`
    try {
        let [rows] = await db.execute(sql_toshow, [query,pagenum,pagesize])
        let [totalpage] = await db.execute(sql_count)
        data = rows
        total = totalpage[0].count
    } catch (err) {
        res.sd(err)
    }
    result = {
        status: 0,
        msg: '查询操作记录成功！',
        total,
        data: data[0]
    }
    res.send(result)
}
