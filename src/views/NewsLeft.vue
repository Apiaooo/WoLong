<template>
  <div>
    <div class="tb">
      <el-table v-loading="loading" :data="tableData" height="600" style="width: 100%;">
        <el-table-column label="ID" prop="id"></el-table-column>
        <el-table-column label="描述" prop="info"></el-table-column>
        <el-table-column label="图片" prop="fileName" align="center">
          <template slot-scope="scope">
            <img :src="url + scope.row.imgName" style="width: 80px;height:80px" />
          </template>
        </el-table-column>
        <el-table-column align="right">
          <template slot-scope="scope">
            <el-button size="mini" @click="openEdit(scope.row.id)">修改</el-button>
            <el-button size="mini" type="danger" @click="deleteImg(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="bt">
      <el-tooltip class="item" effect="dark" content="添加图片" placement="top">
        <el-button @click="open" type="primary" icon="el-icon-plus" circle></el-button>
      </el-tooltip>
    </div>
    <el-dialog title="上传图片" :visible.sync="dialogFormVisible">
      <div class="imgBox">
        <el-upload
          action="http://47.115.143.135:8080/newsLeft/upload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :auto-upload="true"
          multiple
        >
          <i class="el-icon-plus"></i>
        </el-upload>

        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </div>
    </el-dialog>
    <!-- 弹出表单 -->
    <el-dialog title="添加" :visible.sync="dialogFormVisible2">
      <el-form :model="form" ref="form" label-width="100px" class="demo-ruleForm">
        <el-form-item label="图片">
          <img style="height:250px" :src="url+form.imgName" alt="" />
        </el-form-item>
        <el-form-item label="描述" style="width:610px">
          <el-input v-model="form.info"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="edit('form')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      dialogFormVisible2:false,
      tableData: [],
      dialogFormVisible: false,
      loading: true,
      form:{},
      url: "http://47.115.143.135:8080/image/"
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
    open() {
      this.dialogFormVisible = true;
    },
    openEdit(id){
      const that = this;
      this.dialogFormVisible2 = true;
      axios
        .get("http://47.115.143.135:8080/newsLeft/findById/" + id)
        .then(function(resp) {
          that.form = resp.data;
        });
    },
    edit(formName){
      const that = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
           axios.put('http://47.115.143.135:8080/newsLeft/update',this.form).then(function(resp){
             if(resp.data == 'success'){
                that.$message({
                  message: '提交成功！',
                  type: 'success'
                });
                window.location.reload();             
             }else{
               that.$message.error('修改失败！');
             }
           })
          } else {
            return false;
          }
        });
    },
    deleteImg(row) {
      const that = this;
      axios
        .delete("http://47.115.143.135:8080/newsLeft/deleteById/" + row.id)
        .then(function(resp) {
          that.$message({
            message: "删除成功！",
            type: "success"
          });
          //刷新页面
          window.location.reload();
        });
    },
  },
  created() {
    const that = this;
    axios.get("http://47.115.143.135:8080/newsLeft/findAll/0/100").then(function(resp) {
    //   console.log(resp);
      that.tableData = resp.data.content;
      that.loading = false;
    });
  }
};
</script>

<style>
.tb {
  position: absolute;
  margin: 10px 0 0 100px;
  padding: 0;
  width: 1000px;
  height: 600px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.imgBox {
  position: relative;
  margin: 0px 0 0 40px;
  width: 725px;
  height: 400px;
}
.bt {
  position: absolute;
  margin: 250px 0 0 20px;
}
</style>