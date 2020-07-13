<template>
  <div class="app-container" ref="appContainer" v-resize="mixinResize">
    <div class="filter-container" ref="filterContainer">
      <el-form :model="listQuery" class="filter-container-form" size="mini" :inline="true">
        <el-form-item>
          <el-button type="primary" @click="getList()">查询</el-button>
          <el-button type="success" @click="visible = true">添加账号</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="list"
      size="mini"
      border
      :height="mixinHeight"
      :class="['configurationTable', {afterRenderClass: mixinShowAfterRenderClass}]"
      @cell-click="cellClick">
      <el-table-column
        v-for="(item, index) in listTitle"
        :key="index"
        :min-width="item.width"
        :label="item.label"
        align="center"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <span v-if="item.property === 'btn'" class="center">
            <el-button type="primary" size="mini" @click="login(scope.row.id.id)">以用户身份登录</el-button>
            <el-button type="primary" size="mini" @click="del(scope.row)">删除</el-button>
          </span>
          <span v-else>{{ scope.row[item.property] }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination-container"
      ref="pagination"
      @size-change="getList()"
      @current-change="getList()"
      :current-page.sync="page"
      background
      :page-sizes="sizes"
      :page-size.sync="limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <icloud-dialog
      title="添加账号"
      :visible.sync="visible"
      @close="resetForm('form')">
      <el-form ref="form" :model="form" :rules="formRules" size="mini">
        <el-form-item label="电子邮件" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="名字" prop="firstName">
          <el-input v-model="form.firstName"></el-input>
        </el-form-item>
        <el-form-item label="姓" prop="lastName">
          <el-input v-model="form.lastName"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="激活方式" prop="sendActivationMail">
          <el-select v-model="form.sendActivationMail">
            <el-option label="显示激活链接" :value="false"></el-option>
            <el-option label="发送激活邮件" :value="true"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="icloud-dialog-footer" slot="footer">
        <wx-button size="mini" type="primary" @click="submit('form')">添加</wx-button>
        <wx-button size="mini" @click="visible = false">取消</wx-button>
      </div>
    </icloud-dialog>
    <icloud-dialog
      :visible.sync="userAcitonVisible"
      title="用户激活链接">
      <div class="link">
        <span>使用该链接激活用户</span>
        <el-button type="primary" size="mini">激活</el-button>
      </div>
      <div class="link-address">
        <span>{{ link }}</span>
        <el-button type="danger" size="mini">复制</el-button>
      </div>
    </icloud-dialog>
  </div>
</template>

<script>
import { page, resize } from '@/mixins'
// import { setToken } from '@/utils/token'
export default {
  props: ['customerId'],
  mixins: [page, resize],
  data () {
    return {
      listQuery: {},
      list: [],
      listTitle: [
        { property: 'name', label: '登录名', width: 150 },
        { property: 'email', label: '邮箱', width: 150 },
        { property: 'btn', label: '操作', width: 250 }
      ],
      visible: false,
      form: {
        email: '',
        firstName: '',
        lastName: '',
        description: '',
        sendActivationMail: false
      },
      formRules: {
        email: [
          { required: true, message: '电子邮件必填', trigger: ['blur', 'change'] },
          { type: 'email', message: '请输入正确的电子邮件地址', trigger: 'change' }
        ]
      },
      userAcitonVisible: false,
      link: 'http://10.10.17.16:8888/api/noauth/activate?activateToken=lQxVnWy7MT6cCwdpokw0Gbf08WqJWP'
    }
  },
  methods: {
    // async login (id) {
    //   const tokenRes = await this.$api.getToken(id)
    //   if (tokenRes.status === 200) {
    //     setToken(tokenRes.data.token)
    //     const res = await this.$api.getUserInfo(id)
    //     const userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'))
    //   }
    // },
    del (row) {
      this.$confirm('小心！确认后,账户和所有相关数据将不可恢复。', `您确定要删除账户 '${row.name}' 吗？`, {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning'
      }).then(async _ => {
        const res = await this.$api.deleteUser(row.id.id)
        if (res.status === 200) {
          this.$message.success('删除成功')
          this.getList()
        }
      }).catch(() => {})
    },
    submit (formName) {
      this.$refs[formName].validate(async valid => {
        if (!valid) return false
        const params = Object.assign({
          additionalInfo: { description: this.form.description },
          authority: 'CUSTOMER_USER',
          customerId: {
            entityType: 'CUSTOMER',
            id: this.customerId
          }
        }, this.form)
        delete params.description
        delete params.sendActivationMail
        const res = await this.$api.updateUser(params, this.form.sendActivationMail)
        if (res.status === 200) {
          this.$message.success('添加成功')
          this.getList()
          if (!this.form.sendActivationMail) {
            this.visible = false
          } else {
            this.userAcitonVisible = true
          }
        }
      })
    },
    cellClick (row, column) {
      if (column.label === '登录名') {
        this.$router.push({ path: `/customers/${this.customerId}/users/${row.id.id}`, query: { title: row.name } })
      }
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    async getList () {
      const res = await this.$api.getCustomersUserList({
        page: this.page - 1,
        pageSize: this.limit,
        sortProperty: 'createdTime',
        sortOrder: 'DESC'
      }, this.customerId)
      this.list = res.data.data && res.data.data
      this.total = res.data.totalElements
    }
  },
  created () {
    this.getList()
  }
}
</script>

<style lang="scss" scoped>
.link {
  font-size: 20px;
  color: rgba(0, 0, 0, 0.87);
}
.link-address {
  span {
    margin: 20px 0;
    padding: 15px;
    display: inline-block;
    line-height: 1;
    color: #303030;
    font-size: 16px;
    font-family: monospace;
    font-weight: 700;
    background-color: #f7f7f7;
  }
  .el-button {
    margin-left: 10px;
  }
}
</style>
