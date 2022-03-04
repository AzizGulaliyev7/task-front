<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      
      <el-menu-item :span="2" index="1">
          Korxona
      </el-menu-item>
      <el-menu-item :span="2" index="2">
          Xodimlar
      </el-menu-item>
      <el-col :span="2" :offset="18"><el-menu-item @click="logout()">Logout</el-menu-item></el-col>
    </el-menu>
    <el-row type="flex" justify="end">
      <el-col ><span>User name: {{userName}}. </span><span> Role: {{role}}</span></el-col>
    </el-row>
  </div>
</template>

<script>
  import store from "@/store/index";
  import { setTab, getTab, removeTab } from '@/utils/current_tab'
  
  export default {
    name: 'NavBar',
    
    data() {
      return {
        activeIndex: getTab(),
        role: store.getters.role,
        userName: store.getters.user ? store.getters.user.name : '',
      };
    },

    methods: {
      handleSelect(key, keyPath) {
        setTab(key)
        this.activeIndex = key;
        switch(parseInt(key)) {
          case 1:
              if (this.role == 'admin' && (this.$route.path != '/companies/index')) {
                this.$router.push({ name: 'companies.index' });
              } else if(this.role == 'company' && (this.$route.path != '/companies/company')) {
                this.$router.push({ name: 'companies.company' });
              }
            break;
          case 2:
            if ((this.$route.path != '/employees/index')) {
              this.$router.push({ name: 'employees.index' });
            }
            break;
          default:
        }
      },

      logout() {
        this.$store
          .dispatch("auth/logout")
          .then((res) => {
            removeTab();
            this.$router.push(`/login`);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };
</script>
<style>

</style>