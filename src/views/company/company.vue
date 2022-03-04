<template>
    <div>
        <h2>Korxona</h2>
        <el-row :gutter="24">
          <el-col :span="3" :offset="21">
            <el-button v-if="!userCompany" @click="drawerCreate = true" type="success">Malumot kiritsh</el-button>
            <el-button v-else @click="edit()" type="primary"> Taxrirlash </el-button>
        </el-col>
        </el-row>
        <el-row :gutter="24"  type="flex" justify="center" v-loading="loadingData">
          <el-col :span="20">
              <el-descriptions title="Korxona Malumotlari">
                <el-descriptions-item label="Korxona nomi">{{userCompany ? userCompany.name : '---'}}</el-descriptions-item>
                <el-descriptions-item label="Korxona Raxbari (FISH)">{{userCompany ? userCompany.ceo_name : '---'}}</el-descriptions-item>
                <el-descriptions-item label="Manzil">{{userCompany ? userCompany.address : '---'}}</el-descriptions-item>
                <el-descriptions-item label="Email">{{userCompany ? userCompany.email : '---'}}</el-descriptions-item>
                <el-descriptions-item label="Veb sahifa">{{userCompany ? userCompany.web_site : '---'}}</el-descriptions-item>
                <el-descriptions-item label="Telefon Raqam">{{userCompany ? userCompany.phone_number : '---'}}</el-descriptions-item>
            </el-descriptions>
          </el-col>
        </el-row>

        <el-drawer
          v-if="!userCompany"
          @opened="openUpdate('drawerCreateChild')"
          @closed="afterClosed()"
          ref="drawerCreate"
          size="60%"
          title="Create Company"
          :visible.sync="drawerCreate"
          direction="rtl">
          <create @close="closeDrawer" ref="drawerCreateChild" drawer="drawerCreate"></create>
        </el-drawer>

        <el-drawer
          @opened="openUpdate('drawerUpdateChild')"
          @closed="afterClosed()"
          ref="drawerUpdate"
          size="60%"
          title="Update Company"
          :visible.sync="drawerUpdate"
          direction="rtl">
          <update :company="userCompany" @close="closeDrawer" ref="drawerUpdateChild" drawer="drawerUpdate"></update>
        </el-drawer>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Create from "./components/create";
import Update from "./components/update";

export default {
  name: "UserCompany",
  components:{ Create, Update},

  data() {
    return {
        drawerCreate: false,
        drawerUpdate: false,
        loadingData: false
    };
  },

  computed: {
    ...mapGetters({
      userCompany: 'company/userCompany',
    })
  },

  mounted() {
    this.fetchData();
  },

  methods: {
    ...mapActions({
      getUserCompany: 'company/getUserCompany',
    }),

    afterClosed() {
      this.fetchData();
    },

    fetchData() {
      if (!this.loadingData) {
          this.loadingData = true;
          this.getUserCompany().then(res => {
              this.loadingData = false
          }).catch(err => {
              this.loadingData = false
          });
      }
    },

    edit() {
        this.drawerUpdate = true;
    },

    closeDrawer(drawer) {
      if (this.$refs[drawer] && _.isFunction(this.$refs[drawer].closeDrawer)) {
        this.$refs[drawer].closeDrawer();
      }
    },

    openUpdate(drawer) {
      if (this.$refs[drawer] && _.isFunction(this.$refs[drawer].afterOpen)) {
        this.$refs[drawer].afterOpen();
      }
    }
  }
};
</script>
<style>

</style>
