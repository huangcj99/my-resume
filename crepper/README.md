###����С����

����ٽ���ҵ��ͻȻ������������= =����ҪһЩ���ݣ�������дһ�������С���߸��Լ����������á�

�ýű��õ�request+cheerio+mongoose+co��request���ڳ䵱�ͻ��ˣ�cheerio���ڽ���ҳ�沢ͨ��JQ��
�ַ�ȡץȡ�Լ���Ҫ�����ݣ�mongoose�����ڽ�������ģ�����������ݿ⣬co�����ڿ����첽���̡�

�����������£�

```js

1������������Ϣ������mongodb
2���������ñ������ݵĽṹ
3��������Ϊ��λ�ݹ���ȡ��ͬ���ݽṹ������
4�����Դ����ʶָ��������ȡ�����ݵ����(��src��href��innerHTML��,���Լ���չ)

```

����һ�����ݿ����ö���

```js

let dbOption = {
    ipAddress:'localhost',    //����
    port:27017,	              //���ݿ�˿ں�
    database:'myKoa',         //���ݿ���
    doc:"baiduNews"           //���ݿ��ĵ�
};

```

����һ��url����

```js

let urls = [
    'http://xxx.com/'��
    //...
];

```

�½�һ��Schema

```js

//����mongo�����ݽṹ
let schema = mongoose.Schema;
let temp = new schema({
    title:{
        type:String
    },
    href:{
        type:String
    }
});

```

��crepper,�����ҽ���ȡ����ҳ��Ĺ��ܷ�װ��һ��function,�ݹ���ȡͨ����һ��������ִ�У�
�ﵽ����ְ��ķ���(��ʵ����Ӧ�ð��������ݿ�Ĺ��ܷ����ȥ�ȽϺã�����crepper�ܸ��õ���չ):

```js

//����ͨ��һ��IIFE�������ص���crepper��ȡ��������,�������ݿ����ô��룬�������ݿ�
let crepper = (function(dbOpt,temp){
    //�������ݿ������������ݿ�
    mongoose.connect(`mongodb://${dbOpt.ipAddress}:${dbOpt.port}/${dbOpt.database}`);
    //��������ģ��
    let Model = mongoose.model(dbOpt.doc,temp);
    
    //������������urlΪ������ַ��contentΪ��ȡ���ݵ�������
    return function(url,content) {
	...
    }
})(dbOption,temp);

```

�ݹ����crepper����

```js

//�ݹ�ִ������
let runCreppers = function (urls,content) {
    //���ڼ��ж�
    let count = 0;
    if (urls.length !== 0) {
        //ÿһ��crepperִ�з���fullfill�󣬽�shift�����һ��,������ȡ��һ��ҳ��
        co(function *() {
            let url = urls[count];
            yield crepper(url,content);
            //ȥ��urls�ĵ�һ��ٵݹ�ִ��runCrepper
            urls.shift();
            runCreppers(urls,content);
        });
    }
};

//ִ�еݹ���ȡ
runCreppers(urls,content);

```

��������crepper�ĺ��Ĳ��裺

```js
//������ȡҳ��
let downPage = function (){...}

//��������
let analysisData = function ($){...}

//�������ݿ�
let insertToMongo = function (allInfo) {...}

co(function *() {
     let $ = yield downPage();
     let allInfo = yield analysisData($);
     let success = yield insertToMongo(allInfo);
})
    //��׽���󲢴�ӡ
    .catch((err) => {
         console.log(err);
    });

```

�����õ�cj����co�����������첽����co��������ES6��promise��generator��ʵ�ֵģ�koa1
���м�����Ƶײ�������coʵ�ֵģ���Ȼkoa2�Ѿ�������ES7��async��await�ˡ�
