# egg+sequelize实现对数据库的增删改查，多表查询以及多表更新
## 快速开始
### 安装
可以参照egg的官方文档使用。

### 相关api的说明
#### insertUsers（）：向Users表插入信息
参数
1. account：用户账号
2. password：用户密码
#### insetInformation：想Information表插入信息
参数
1. name：名字
2. sex：性别
3. User_id：用户id
#### query：查询信息
参数：
1. table：Users，这时在Users表查询信息
  - account：Users的账号
2. table：Information，这时在Information表查询信息
  - name:informaiton表中的名字
#### delete：删除信息
参数：
1. table：Users，这时在Users表删除信息
  - account：根据Users的账号来删除信息
2. table：Information，这时在Information表删除信息
  - name:根据informaiton表中的名字来删除信息
#### update：更新信息
参数：
1. table：Users，这时在Users表删除信息
  - account：根据Users的账号来寻找信息
  - password：新密码
2. table：Information，这时在Information表删除信息
  - name:根据name来寻找信息
  - sex：新性别
3. table：multi：两个表一起更新
  -需要的参数是前面两个的总和（account，password，name，sex）
#### multilistQuery：联合查询函数，会寻找Users表和information表有关联的信息，并返回结果
参数
1. name：需要查找对象的名字
