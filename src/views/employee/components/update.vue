<template>
    <div>
      <el-row type="flex" :gutter="24" justify="center">
        <span><h3>Korxona: {{userCompany ? userCompany.name : 'Korxona mavjud emas. Korxona malumotlarini kiriting!'}}</h3></span>
      </el-row>
      <el-row type="flex" :gutter="24" justify="center">
        <el-col v-loading="loading" :span="20">
          <el-form ref="form" label-position="right" label-width="150px" :model="form" :rules="rules">
            <el-form-item size="small" label="Passport raqami" prop="passport_number">
              <el-input v-model="form.passport_number"></el-input>
            </el-form-item>
            <el-form-item size="small" label="Familyasi" prop="last_name">
              <el-input v-model="form.last_name"></el-input>
            </el-form-item>
            <el-form-item size="small" label="Ismi" prop="first_name">
              <el-input v-model="form.first_name"></el-input>
            </el-form-item>
            <el-form-item size="small" label="Otasining Ismi">
              <el-input v-model="form.middle_name"></el-input>
            </el-form-item>
            <el-form-item size="small" label="Lavozimi">
              <el-input v-model="form.position"></el-input>
            </el-form-item>
            <el-form-item size="small" label="Telefon Raqami" prop="phone_number">
              <el-input v-model="form.phone_number"></el-input>
            </el-form-item>
            <el-form-item size="small" label="Manzili">
              <el-input v-model="form.address"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>

      <el-row type="flex" justify="center">
        <el-col :span="6"><el-button :loading="waiting" @click="submit()" type="primary">Update</el-button></el-col>
      </el-row>
    </div>
</template>
<script>

import { mapActions } from "vuex";
import employee from "@/utils/mixins/employee";

export default {
  name: "EmployeeUpdate",
  mixins:[employee],
  props: ['employee','drawer'],

  methods: {
    ...mapActions({
      save: 'employee/update',
      getModel: 'employee/show'
    }),

    load(){
        if (!this.loading && this.employee) {
            this.loading = true;
            this.getModel(this.employee.id)
            .then(res => {
                this.form = JSON.parse(JSON.stringify(this.model));
                this.loading = false;
            })
            .catch(err => {
                this.loading = false;
            })
        }
    },

    afterOpen() {
      if (!this.userCompany) this.getUserCompany();
      this.load();
    }
  }
};
</script>
<style>

</style>
