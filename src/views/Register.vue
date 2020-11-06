<template>
  <v-app app>

    <div class="back" @click="goBack" v-if="!registerForm">
      <svg width="16" height="28" viewBox="0 0 16 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 4L6 14L16 24L14 28L0 14L14 0L16 4Z" fill="#9DCCFF"/>
      </svg>
      <span>{{$t('auth.back')}}</span>
    </div>

    <NavbarEmpty />

    <form class="login-form register-form"  @submit.prevent="register()" :class="{show: animateTrigger}" v-if="registerForm">
      <img class="logo" src="@/assets/icons/smallLogo.svg" alt="">
      <div class="form-title">{{$t('auth.EasySellRegister')}}</div>
      <div class="registration-first-stage registration-item" v-show="firstStage">
        <div class="form-description">{{$t('auth.authRegisterDescription')}}</div>
        <social-auth></social-auth>
        <div class="login-item first" :class="{show: animateTrigger}">
          <span class="phone-placeholder" v-if="phonePlaceholder">+38</span>
          <small
              v-if="$v.email.$dirty && !$v.email.required"
              class="input-invalid"
          >{{$t('auth.enterEmailOrPhone')}}</small>
          <small
              v-else-if="$v.email.$dirty && !$v.email.email"
              class="input-invalid"
          >{{$t('auth.emailNotCorrect')}}</small>
          <span class="label" v-else>{{$t('auth.numberOrEmail')}}</span>
          <input
              class="login-email"
              v-model="email"
              :error-messages="emailErrors"
              :class="{errorInput: emailErrors.length, loginPhone: phonePlaceholder}"
              label="E-mail"
              @input="checkRegisterValue()"
          />
        </div>
        <div class="register-text" :class="{show: animateTrigger}">{{$t('auth.registerText')}}</div>
        <span class="label label-error" v-if="errored">{{$t('auth.authError')}}</span>
        <v-btn
           type="sumbit"
           @click="register()"
           :class="{show: animateTrigger}"
           :loading="loading"
           :disabled="loading"
        >{{$t('auth.proceed')}}</v-btn
          >
        <div class="forgot-pass have-account" :class="{show: animateTrigger}">
          <span>{{$t('auth.haveAccount')}}</span>
          <router-link to="/login" class="registration">{{$t('auth.enter')}}</router-link>
        </div>
      </div>

      <div class="registration-second-stage confirm-password" v-show="secondStage">

        <div class="login-item second" :class="{show: animateTrigger}">
          <div class="reminder-content">
            <p>Пароль для входа отправлен на ваш e-mail / телефон</p>
            <p class="resend">Не пришло письмо / sms<span>{{$t('auth.resendLink')}}</span></p>
          </div>
        </div>
<!--        <div class="login-item second" :class="{show: animateTrigger}">-->
<!--          <small-->
<!--              v-if="$v.password.$dirty && !$v.password.required"-->
<!--              class="input-invalid"-->
<!--          >{{$t('auth.enterPassword')}}</small>-->
<!--          <span class="label" v-else>{{$t('auth.enterPassword')}}</span>-->
<!--          <input-->
<!--              class="login-password"-->
<!--              v-model="password"-->
<!--              :error-messages="passwordErrors"-->
<!--              :class="{errorInput: passwordErrors.length}"-->
<!--              label="Password"-->
<!--              :type="type"-->
<!--              @input="$v.password.$touch()"-->
<!--              @blur="$v.password.$touch()"-->
<!--          />-->
<!--          <div class="showPass" v-if="password.length" @click="showPassword">-->
<!--            <svg v-if="!showPass" width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--              <path fill-rule="evenodd" clip-rule="evenodd" d="M9 0C7.07143 0 5.4 0.533333 3.98571 1.6L5.01429 2.53333C6.17143 1.73333 7.45714 1.33333 9 1.33333C13.2429 1.33333 16.7143 4.93333 16.7143 9.33333H18C18 4.13333 14.0143 0 9 0ZM0 1.33333L2.05714 3.33333C0.771428 4.93333 0 7.06667 0 9.33333H1.28571C1.28571 7.33333 1.92857 5.6 3.08571 4.26667L5.91429 6.93333C5.4 7.6 5.14286 8.4 5.14286 9.33333C5.14286 11.6 6.81429 13.3333 9 13.3333C10.0286 13.3333 10.9286 12.9333 11.5714 12.2667L15.4286 16L16.3286 15.0667L0.9 0.4L0 1.33333ZM6.81429 7.86667L10.5429 11.4667C10.1571 11.7333 9.64286 12 9 12C7.58571 12 6.42857 10.8 6.42857 9.33333C6.42857 8.8 6.55714 8.26667 6.81429 7.86667ZM12.8571 10L11.5714 8.8C11.3143 7.73333 10.4143 6.8 9.25714 6.66667L7.97143 5.46667C8.35714 5.33333 8.61429 5.33333 9 5.33333C11.1857 5.33333 12.8571 7.06667 12.8571 9.33333V10Z" fill="#9DCCFF"/>-->
<!--            </svg>-->
<!--            <svg v-if="showPass" width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--              <path fill-rule="evenodd" clip-rule="evenodd" d="M0 9.1C0 4.03 3.98571 0 9 0C14.0143 0 18 4.03 18 9.1H16.7143C16.7143 4.81 13.2429 1.3 9 1.3C4.75714 1.3 1.28571 4.81 1.28571 9.1H0ZM5.14286 9.1C5.14286 6.89 6.81429 5.2 9 5.2C11.1857 5.2 12.8571 6.89 12.8571 9.1C12.8571 11.31 11.1857 13 9 13C6.81429 13 5.14286 11.31 5.14286 9.1ZM6.42857 9.1C6.42857 10.53 7.58571 11.7 9 11.7C10.4143 11.7 11.5714 10.53 11.5714 9.1C11.5714 7.67 10.4143 6.5 9 6.5C7.58571 6.5 6.42857 7.67 6.42857 9.1Z" fill="#5893D4"/>-->
<!--            </svg>-->
<!--          </div>-->
<!--        </div>-->

<!--        <div class="login-item second" :class="{show: animateTrigger}">-->
<!--          <small-->
<!--              v-if="$v.password.$dirty && !$v.password.required"-->
<!--              class="input-invalid"-->
<!--          >{{$t('auth.repeatPassword')}}</small>-->
<!--          <small-->
<!--              v-else-if="$v.password.$dirty && !$v.passwordConfirmation.sameAsPassword"-->
<!--              class="input-invalid"-->
<!--          >{{$t('auth.passwordMismatch')}}</small>-->
<!--          <span class="label" v-else>{{$t('auth.repeatPassword')}}</span>-->
<!--          <input-->
<!--              class="login-password"-->
<!--              v-model="passwordConfirmation"-->
<!--              :error-messages="passwordErrors"-->
<!--              :class="{errorInput: passwordErrors.length}"-->
<!--              label="Password"-->
<!--              :type="type"-->
<!--              @input="$v.password.$touch()"-->
<!--              @blur="$v.password.$touch()"-->
<!--          />-->
<!--        </div>-->
<!--        <v-btn type="sumbit"-->
<!--               @submit.prevent="register()"-->
<!--               @click="loader = 'loading'"-->
<!--               :class="{show: animateTrigger}"-->
<!--               :loading="loading"-->
<!--               :disabled="loading"-->
<!--        >{{$t('auth.registerNow')}}-->
<!--        </v-btn>-->
        <v-btn
               @click="loader = 'loading'"
               :class="{show: animateTrigger}"
               :loading="loading"
               :disabled="loading"
        >
          <router-link to="/login" class="registration">{{$t('auth.enter')}}</router-link></v-btn>
      </div>

    </form>


    <div class="anim anim-1" :class="{show : anim1}">
      <svg class="svg3" :class="{show: svgScale}" width="493" height="120" viewBox="0 0 493 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect opacity="0.8" x="124.244" y="38.046" width="24.86" height="24.86" fill="white"/>
        <rect opacity="0.8" x="-1.71289" y="0.756104" width="24.86" height="24.86" fill="white"/>
        <rect opacity="0.8" x="196.338" y="85.2799" width="24.86" height="24.86" fill="white"/>
        <rect opacity="0.8" x="38.0625" y="55.448" width="14.916" height="14.916" fill="white"/>
        <rect opacity="0.2" x="83.6387" y="25.6161" width="24.86" height="24.86" fill="white"/>
        <rect opacity="0.2" x="137.502" y="85.2799" width="14.916" height="14.916" fill="white"/>
        <rect opacity="0.2" x="319.809" y="85.2799" width="24.86" height="24.86" fill="white"/>
        <rect opacity="0.2" x="375.33" y="110.14" width="24.86" height="24.86" fill="white"/>
        <rect opacity="0.2" x="443.279" y="80.308" width="14.916" height="14.916" fill="white"/>
        <rect opacity="0.1" x="484.713" y="105.997" width="8.28666" height="8.28666" fill="white"/>
        <rect opacity="0.5" x="161.533" y="13.186" width="24.86" height="24.86" fill="white"/>
        <rect opacity="0.5" x="263.461" y="103.511" width="24.86" height="24.86" fill="white"/>
        <rect opacity="0.5" x="201.309" y="48.8187" width="14.916" height="14.916" fill="white"/>
        <rect opacity="0.5" x="61.2656" y="102.682" width="14.916" height="14.916" fill="white"/>
        <rect opacity="0.2" x="-10" y="90.252" width="24.86" height="24.86" fill="white"/>
      </svg>
      <svg class="svg4" :class="{show: svgScale}" width="493" height="120" viewBox="0 0 493 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect opacity="0.8" width="24.86" height="24.86" transform="matrix(-1 0 0 1 368.756 38.046)" fill="white"/>
        <rect opacity="0.8" width="24.86" height="24.86" transform="matrix(-1 0 0 1 494.713 0.756104)" fill="white"/>
        <rect opacity="0.8" width="24.86" height="24.86" transform="matrix(-1 0 0 1 296.662 85.2799)" fill="white"/>
        <rect opacity="0.8" width="14.916" height="14.916" transform="matrix(-1 0 0 1 454.938 55.448)" fill="white"/>
        <rect opacity="0.2" width="24.86" height="24.86" transform="matrix(-1 0 0 1 409.361 25.6161)" fill="white"/>
        <rect opacity="0.2" width="14.916" height="14.916" transform="matrix(-1 0 0 1 355.498 85.2799)" fill="white"/>
        <rect opacity="0.2" width="24.86" height="24.86" transform="matrix(-1 0 0 1 173.191 85.2799)" fill="white"/>
        <rect opacity="0.2" width="24.86" height="24.86" transform="matrix(-1 0 0 1 117.67 110.14)" fill="white"/>
        <rect opacity="0.2" width="14.916" height="14.916" transform="matrix(-1 0 0 1 49.7207 80.308)" fill="white"/>
        <rect opacity="0.1" width="8.28666" height="8.28666" transform="matrix(-1 0 0 1 8.28711 105.997)" fill="white"/>
        <rect opacity="0.5" width="24.86" height="24.86" transform="matrix(-1 0 0 1 331.467 13.186)" fill="white"/>
        <rect opacity="0.5" width="24.86" height="24.86" transform="matrix(-1 0 0 1 229.539 103.511)" fill="white"/>
        <rect opacity="0.5" width="14.916" height="14.916" transform="matrix(-1 0 0 1 291.691 48.8187)" fill="white"/>
        <rect opacity="0.5" width="14.916" height="14.916" transform="matrix(-1 0 0 1 431.734 102.682)" fill="white"/>
        <rect opacity="0.2" width="24.86" height="24.86" transform="matrix(-1 0 0 1 503 90.252)" fill="white"/>
      </svg>
      <svg width="1920" height="424" viewBox="0 0 1920 424" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0.296564C0 0.296564 219.063 119.471 367 129.445C607.73 145.675 702.403 2.29063 944.5 0.296536C1176.11 -1.61122 1306.38 146.004 1536.5 129.445C1682.38 118.947 1920 0.296564 1920 0.296564V423.297H0V0.296564Z" fill="url(#paint0_linear)"/>
        <defs>
          <linearGradient id="paint0_linear" x1="960" y1="0.296509" x2="960" y2="343.296" gradientUnits="userSpaceOnUse">
            <stop stop-color="#5893D4"/>
            <stop offset="1" stop-color="#8DB7E4"/>
          </linearGradient>
        </defs>
      </svg>
    </div>
    <div class="anim anim-2" :class="{show : anim2}">
      <svg class="svg1" :class="{show: svgScale}" width="453" height="131" viewBox="0 0 453 131" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.6">
          <rect opacity="0.2" x="316" y="88" width="18" height="18" fill="white"/>
          <rect opacity="0.2" x="223" y="92" width="18" height="18" fill="white"/>
          <rect opacity="0.2" y="57" width="18" height="18" fill="white"/>
          <rect opacity="0.3" x="159" y="52" width="15" height="15" fill="white"/>
          <rect opacity="0.1" x="103" y="93" width="15" height="15" fill="white"/>
          <rect opacity="0.1" x="73" width="15" height="15" fill="white"/>
          <rect opacity="0.1" x="386" y="121" width="10" height="10" fill="white"/>
          <rect opacity="0.3" x="443" y="107" width="10" height="10" fill="white"/>
          <rect opacity="0.1" x="264" y="70" width="10" height="10" fill="white"/>
        </g>
      </svg>
      <svg class="svg2" :class="{show: svgScale}" width="453" height="131" viewBox="0 0 453 131" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.6">
          <rect opacity="0.2" width="18" height="18" transform="matrix(-1 0 0 1 137 88)" fill="white"/>
          <rect opacity="0.2" width="18" height="18" transform="matrix(-1 0 0 1 230 92)" fill="white"/>
          <rect opacity="0.2" width="18" height="18" transform="matrix(-1 0 0 1 453 57)" fill="white"/>
          <rect opacity="0.3" width="15" height="15" transform="matrix(-1 0 0 1 294 52)" fill="white"/>
          <rect opacity="0.1" width="15" height="15" transform="matrix(-1 0 0 1 350 93)" fill="white"/>
          <rect opacity="0.1" width="15" height="15" transform="matrix(-1 0 0 1 380 0)" fill="white"/>
          <rect opacity="0.1" width="10" height="10" transform="matrix(-1 0 0 1 67 121)" fill="white"/>
          <rect opacity="0.3" width="10" height="10" transform="matrix(-1 0 0 1 10 107)" fill="white"/>
          <rect opacity="0.1" width="10" height="10" transform="matrix(-1 0 0 1 189 70)" fill="white"/>
        </g>
      </svg>
      <svg width="1920" height="495" viewBox="0 0 1920 495" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 22.8926C0 22.8926 162.063 -9.07056 310 2.89258C550.73 22.3596 734.403 135.023 976.5 132.631C1208.11 130.343 1392.88 22.7546 1623 2.89258C1768.88 -9.69832 1920 22.8926 1920 22.8926V494.297H0V22.8926Z" fill="url(#paint0_linear)"/>
        <defs>
          <linearGradient id="paint0_linear" x1="960" y1="-2.70349" x2="960" y2="414.296" gradientUnits="userSpaceOnUse">
            <stop stop-color="#5893D4"/>
            <stop offset="1" stop-color="#8DB7E4"/>
          </linearGradient>
        </defs>
      </svg>
    </div>
  </v-app>
</template>

<script>

import { validationMixin } from 'vuelidate'
import { required, email, or, alphaNum , sameAs, minLength} from 'vuelidate/lib/validators'
import NavbarEmpty from "@/components/app/NavbarEmpty"
import SocialAuth from "@/components/app/auth/SocialAuth"
export default {
  name: 'register',
  mixins: [validationMixin],
  validations: {
    username: {required, custom: or(email, alphaNum)},
    email: { required, email},
    phone: { required, minLength: minLength(10) },
    password: {required},
    passwordConfirmation: { required, sameAsPassword: sameAs('password') }
  },
  components: {
    NavbarEmpty,
    SocialAuth
  },
  data: () => ({
    username: '',
    name: '',
    email: '',
    password: '',
    phone: '',
    passwordConfirmation: '',
    number: '',
    type: 'password',
    loader: null,
    loading: false,
    animateTrigger: false,
    animateTrigger2: false,
    reminderSent: false,
    anim1: false,
    anim2: false,
    svgScale: false,
    errored: false,
    showPass: false,
    showPassConfirm: false,
    registerForm: true,
    firstStage: true,
    secondStage: false,
    phonePlaceholder: false,
  }),

  computed: {
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.maxLength && errors.push('Name must be at most 10 characters long')
      !this.$v.name.required && errors.push('Name is required.')
      return errors
    },
    usernameErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      //!this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      !this.$v.phone.required && errors.push('Phone is required')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('Password is required')
      return errors
    }
  },

  methods: {
    nextStage() {
      this.firstStage = false
      this.secondStage = true
    },
    showPassword() {
      if(this.type === 'password') {
        this.type = 'text'
        this.showPass = true
      } else {
        this.type = 'password'
        this.showPass = false
      }
    },
    goBack() {
      this.registerForm = true
      this.reminderForm = false
      this.reminderSent = false
    },
    checkRegisterValue() {
      if( !isNaN(this.email) && this.email.length ) {
        this.phonePlaceholder = true
      } else {
        this.phonePlaceholder = false
      }
    },
    async register () {
      if(!isNaN(this.email) && this.email.length > 0) {
        this.phonePlaceholder = true
        let data = {
          phone: '38' + this.email
        }
        try {
          this.loading = true
          await this.$store.dispatch('register', data)
          this.loading = false
          this.nextStage()
        } catch (e) {
          console.log(e)
        }
      } else {
        let data = {
          email: this.email
        }
        if (this.$v.email.$invalid) {
          this.$v.email.$touch()
          return
        } else {
          try {
            this.loading = true
            await this.$store.dispatch('register', data)
            this.loading = false
            this.nextStage()
          } catch (e) {
            console.log(e)
          }
        }
      }
    }
  },

  async mounted() {
    setTimeout(() => {
      this.animateTrigger = true
    },1000)
    setTimeout(() => {
      this.svgScale = true
    },2000)
    setTimeout(() => {
      this.anim1 = true
      this.anim2 = true
    },100)
    this.animateTrigger2 = true
  }

}
</script>

<style lang="sass">

.registration-second-stage.confirm-password
  .reminder-content
    min-height: 100px
    display: flex
    align-items: center
    flex-wrap: wrap
    margin-bottom: 20px
    padding: 30px 55px 0 55px
    p
      width: 100%


</style>