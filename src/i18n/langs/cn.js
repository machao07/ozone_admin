import enLocale from 'element-ui/lib/locale/lang/zh-CN'
const cn = {
    login: {
        'btn': '登录',
        'username': '用户名',
        'password': '密码',
        'title': '系统登录',
        'nameholder': '请输入账号',
        'passholder': '请输入密码',
        'verifycode': '请输入验证码',
        'subtitle1': '还没有账号？',
        'subtitle2': '立即注册'
    },
    register: {
        'btn': '注册',
        'name': '姓名',
        'password': '密码',
        'title': '系统注册',
        'accountholder': '请输入您的账号',
        'nameholder': '请输入您的姓名',
        'passholder': '请输入密码',
        'passconfirm': '请确认密码',
        'subtitle1': '已有账号？',
        'subtitle2': '立即登录'
    },
    change: {
        'title': '修改密码',
        'oldpassholder': '请输入当前密码',
        'passholder': '请输入新密码',
        'repassholder': '请再次输入新密码',
        'btn': '确认修改'
    },
    menu: {
        'home': '首页',
        'testing': '检测',
        'monitor': '监测',
        'track': '追踪',
        'reportTube': '报管'
    },
    dropdown: {
        'me': '个人中心',
        'change': '修改密码',
        'logout': '退出登录'
    },
    homeMsg: {
        'title': '区块链智能合约安全检测平台',
        'subTitle': 'Blockchain Smart Contract Security Checking System'
    },
    footer: {
        'msg': '© Copyright 2018 青岛墨一客区块链有限公司'
    },
    testing: {
        'title': '智能合约检测',
        'subTitle': '添加智能合约地址，上传智能合约代码文件。',
        from: {
            'upLoad': '上传文件',
            'addContract': '添加合约',
            'searchholder': '搜索',
            'searchBtn': '查询',
            'allDel': '批量删除'
        },
        List: {
            'num': '编号',
            'contractName': '合约/文件名称',
            'addTime': '添加时间',
            'statues': '检测状态',
            'operations': '操作',
            operationsBtn: {
                'see': "查看",
                'del': "删除",
                'download': '下载报告',
                'product': '生成报告'
            },
            statuesbtn: {
                'un': '未检测',
                'suc': '检测成功',
                'fail': '检测失败'
            }
        }
    },
    testresult: {
        'title': '检测结果'
    },
    ...enLocale
}
export default cn