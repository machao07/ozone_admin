import enLocale from 'element-ui/lib/locale/lang/en'
const en = {
    login: {
        'btn': 'Login',
        'username': 'Username',
        'password': 'Password',
        'title': 'System Login',
        'nameholder': 'Please enter your account number',
        'passholder': 'Please input a password',
        'subtitle1': 'No account yet? ',
        'subtitle2': 'Immediate registration'
    },
    register: {
        'btn': 'Register',
        'name': 'Name',
        'password': 'Password',
        'title': 'System registration',
        'accountholder': 'Please enter your account number',
        'nameholder': 'Please enter your name',
        'passholder': 'Please input a password',
        'passconfirm': 'Please confirm your password',
        'subtitle1': 'Do you have an account? ',
        'subtitle2': 'Login immediately'
    },
    menu: {
        'home': 'Home',
        'testing': 'Testing',
        'monitor': 'Monitor',
        'track': 'Track',
        'reportTube': 'Report Tube'
    },
    homeMsg: {
        'title': 'Blockchain Smart Contract Security Checking System',
        'subTitle': '区块链智能合约安全检测平台'
    },
    footer: {
        'msg': '© Copyright 2018 Qingdao Moyike Block Chain Co., Ltd.'
    },
    testing: {
        'title': 'Intelligent Contract Detection',
        'subTitle': 'Add smart contract address and upload smart contract code file.',
        from: {
            'upLoad': 'Upload files',
            'addContract': 'Add contract',
            'searchholder': 'Search',
            'searchBtn': 'Search',
            'allDel': 'Batch deletion'
        },
        List: {
            'num': 'Number',
            'contractName': 'Contract / File Name',
            'addTime': 'Adding Time',
            'statues': 'Detection State',
            'operations': 'Operation',
            operationsBtn: {
                'see': "Inquiry",
                'del': "Delete",
                'download': 'Download Report'
            },
            statuesbtn: {
                '0': 'Undetected',
                '1': 'Successful Detection',
                '2': 'Failure Detection'
            }
        }
    },
    testresult: {
        'title': 'Detection Result'
    },
    ...enLocale
}
export default en