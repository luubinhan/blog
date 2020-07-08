<template>
  <form
    name="contact"
    method="POST"
    v-on:submit.prevent="handleSubmit"
    data-netlify="true"
    data-netlify-honeypot="bot-field"
  >
    <div v-if="sent">
      <b-message type="is-success">
        Cảm ơn bạn đã để lại lời nhắn
      </b-message>
    </div>
    <div v-else>
      <input type="hidden" name="form-name" value="contact" />

      <b-field label="Tên của bạn *">
        <b-input
          v-model="formData.name"
          required
          name="name"
          validation-message="Bắt buộc nhập"
          placeholder="Nguyễn Văn A"
        />
      </b-field>

      <b-field label="Email *">
        <b-input
          type="email"
          v-model="formData.email"
          maxlength="30"
          required
          name="email"
          placeholder="email@gmail.com"
          validation-message="Giá trị không hợp lệ"
        />
      </b-field>

      <b-field label="Lời nhắn">
        <b-input
          maxlength="200"
          type="textarea"
          v-model="formData.message"
          name="message"
        />
      </b-field>
      <b-button type="is-primary" expanded native-type="submit">Gửi</b-button>
    </div>
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: "FormContact",

  data() {
    return {
      sent: true,
      formData: {
        email: "",
        message: "",
        name: "",
      },
    };
  },

  methods: {
    encode(data) {
      return Object.keys(data)
        .map(
          (key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
        )
        .join("&");
    },
    async handleSubmit(e) {
      const axiosConfig = {
        header: { "Content-Type": "application/x-www-form-urlencoded" },
      };
      try {
        await axios.post(
          "/",
          this.encode({
            "form-name": e.target.getAttribute("name"),
            ...this.formData,
          }),
          axiosConfig
        );
        this.$buefy.toast.open({
          duration: 5000,
          message: "Đã gửi lời nhắn thành công",
          position: "is-top",
          type: "is-success",
        });
      } catch (error) {
        console.warn(error);
        this.$buefy.toast.open({
          duration: 5000,
          message: `Something went go. Try later.`,
          position: "is-bottom",
          type: "is-danger",
        });
      }
    },
    // read more at: https://docs.netlify.com/forms/setup/
  },
};
</script>
