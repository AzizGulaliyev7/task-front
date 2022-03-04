<template>
    <div>
      <el-row type="flex" :gutter="24" justify="center">
        <el-col v-loading="loading" :span="20">
          <el-form ref="form" label-position="right" label-width="150px" :model="form" :rules="rules">
            <el-form-item size="small" label="Korxona nomi" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item size="small" label="Korxona Raxbari (FISH)">
              <el-input v-model="form.ceo_name"></el-input>
            </el-form-item>
            <el-form-item size="small" label="Manzil">
              <el-input v-model="form.address"></el-input>
            </el-form-item>
            <el-form-item size="small" label="Email">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item size="small" label="Veb sahifa">
              <el-input v-model="form.web_site"></el-input>
            </el-form-item>
            <el-form-item size="small" label="Telefon Raqam" prop="phone_number">
              <el-input v-model="form.phone_number"></el-input>
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
import company from "@/utils/mixins/company";

export default {
  name: "CompanyUpdate",
  mixins:[company],
  props: ['company', 'drawer'],

  methods: {
    ...mapActions({
      save: 'company/update',
      getModel: 'company/show'
    }),

    load(){
        if (!this.loading && this.company) {
            this.loading = true;
            this.getModel(this.company.id)
            .then(res =>{
                this.form = JSON.parse(JSON.stringify(this.model));
                this.loading = false;
            })
            .catch(err => {
                this.loading = false;
            })
        }
    },

    afterOpen() {
      this.load();
    }
  }
};
</script>
<style>

</style>
