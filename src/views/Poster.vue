<template>
  <div>
    <div class="posterTb">
      <el-table v-loading="loading" :data="tableData" height="600" style="width: 100%;">
        <el-table-column label="ID" prop="id"></el-table-column>
        <el-table-column label="图片" prop="fileName" align="center">
          <template slot-scope="scope">
            <img :src="url + scope.row.imgName" style="width: 80px;height:80px" />
          </template>
        </el-table-column>
        <el-table-column align="right">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="deleteImg(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="color:red">温馨提示：长图显示效果最佳</div>
    </div>
    <div class="posterBt">
      <el-tooltip class="item" effect="dark" content="添加图片" placement="top">
        <el-button @click="open" type="primary" icon="el-icon-plus" circle></el-button>
      </el-tooltip>
    </div>
    <el-dialog title="上传图片" :visible.sync="dialogFormVisible">
      <div class="imgBox">
        <el-upload
          action="http://47.115.143.135:8080/poster/upload"
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      tableData: [],
      pageSize: 1,
      total: 1,
      dialogFormVisible: false,
      loading: true,
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
    deleteImg(row) {
      const that = this;
      axios
        .delete("http://47.115.143.135:8080/poster/deleteById/" + row.id)
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
    axios.get("http://47.115.143.135:8080/poster/findAll/0/100").then(function(resp) {
    //   console.log(resp);
      that.tableData = resp.data.content;
      that.loading = false;
    });
  }
};
</script>

<style>
.posterTb {
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
.posterBt {
  position: absolute;
  margin: 250px 0 0 20px;
}
</style>