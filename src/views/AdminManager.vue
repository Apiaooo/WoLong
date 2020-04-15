<template>
  <div class="adminbox">
    <div class="Abox1">
      <div class="add">
        <el-button type="primary" icon="el-icon-edit" circle @click="dialogFormVisible2 = true"></el-button>
      </div>
      <el-table v-loading="loading" :data="tableData" style="width: 100%">
        <el-table-column label="ID" width="100">
          <template slot-scope="scope">
            <i class="el-icon-star-off"></i>
            <span style="margin-left: 10px">{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户名" width="180">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>名称: {{ scope.row.name }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">
                  <i class="el-icon-user"></i>
                  {{ scope.row.name }}
                </el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="密码" width="180">
          <template slot-scope="scope">
            <i class="el-icon-lock"></i>
            <span style="margin-left: 10px">{{ scope.row.password }}</span>
          </template>
        </el-table-column>
        <el-table-column label="头像" width="180">
          <template slot-scope="scope">
            <img :src="url + scope.row.headImg" style="width: 80px;height:80px" />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="220">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="Abox2"></div>
    <div class="Abox3"></div>
    <!-- 弹出表单 -->
    <el-dialog class="Atan" title="编辑" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="ID" style="width:300px">
          <el-input v-model="ruleForm.id" readonly></el-input>
        </el-form-item>
        <el-form-item label="用户名" style="width:300px">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" style="width:300px">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="edit('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 头像上传 -->
    <el-dialog class="Atan2" title="添加" :visible.sync="dialogFormVisible2">
      <el-upload
        action="http://47.115.143.135:8080/admin/upload"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :auto-upload="true"
        multiple
        :limit="1"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt />
      </el-dialog>
      <div>提示：先添加头像再修改资料,一次只能上传一张，上传后刷新页面</div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      dialogFormVisible2: false,
      dialogVisible: false,
      dialogImageUrl: "",
      ruleForm: {},
      loading: true,
      url: "http://47.115.143.135:8080/image/",
      form: {
        name: "",
        password: ""
      }
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleEdit(id) {
      const that = this;
      this.dialogFormVisible = true;
      axios
        .get("http://47.115.143.135:8080/admin/findById/" + id)
        .then(function(resp) {
          that.ruleForm = resp.data;
        });
    },
    handleDelete(id) {
      const that = this;
      axios
        .delete("http://47.115.143.135:8080/admin/deleteById/" + id)
        .then(function(resp) {
          that.$message({
            message: "删除成功！",
            type: "success"
          });
          //刷新页面
          window.location.reload();
        });
    },
    edit(formName) {
      const that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios
            .put("http://47.115.143.135:8080/admin/update", this.ruleForm)
            .then(function(resp) {
              if (resp.data == "success") {
                that.$message({
                  message: "修改成功！",
                  type: "success"
                });
                window.location.reload();
              } else {
                this.$message.error("修改失败！");
              }
            });
        } else {
          return false;
        }
      });
    },
    
  },
  created() {
    const that = this;
    axios.get("http://47.115.143.135:8080/admin/findAll/0/10").then(function(resp) {
      that.tableData = resp.data.content;
      that.pageSize = resp.data.size;
      that.total = resp.data.totalElements;
      that.loading = false;
    });
  }
};
</script>

<style>
.adminbox {
  position: relative;
  margin: 10px 0 0 100px;
}
.add {
  padding: 10px 0 0 10px;
}
.Abox1 {
  position: absolute;
  margin: 50px 0 0 20px;
  width: 860px;
  height: 500px;
  background-color: white;
  z-index: 100;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.Abox2 {
  position: absolute;
  margin: 40px 0 0 30px;
  width: 860px;
  height: 500px;
  background-color: white;
  z-index: 10;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.Abox3 {
  position: absolute;
  margin: 30px 0 0 40px;
  width: 860px;
  height: 500px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.Atan {
  width: 800px;
  padding-left: 25%;
}
.Atan2 {
  width: 500px;
  padding-left: 30%;
}
</style>