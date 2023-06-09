export const environment={
  production:false,
  backendUrl:'http://localhost:9001/api',
  backendUrlUser:'http://localhost:9001/api/User',
  backendUrlPicture:'http://localhost:9001',
  hubUrl:"http://localhost:9001/hubs",
  chatHubUrl:"http://localhost:9001/hubs/chat",
  storage:{
    otherUserPhoneNumberForChat:"otherUserPhoneNumberForChat",
    groupName:"groupName",
    myPhoneNumber:"myPhoneNumber",
    myPhoneNumberForAuth:"myPhoneNumberForAuth",
  },
  roles:{
    boss:"Boss",
    admin:"Admin",
    seller:"Seller",
    user:"User",
  },
  productSetting:{
    thumbnail:1,
    sliderStart:2,
    sliderEnd:10,
  },
  keyBasketLocalStorage:"customerBasketId",
  keyUserToken:"userToken",
  messages:{
    common:{
      pleaseEnterSite:"لطفا ابتدا وارد سایت شوید.",
      messageEmpty:"پیام شما خالی است! ",
      failedConnectionChatHub:"ارتباط برای چت برقرار نشد!",
      doYouWantToExit:"ایا میخاهید خارج شوید؟",
      registerSuccess:"ثبت نام موفقیت انجام شد.",
      loginSuccess:"ورود با موفقیت انجام شد.",
      doYouWantToCancelSendThisPicture:"ایا میخاهید فرستلدن این عکس را کنسل کنید؟",
      addressCopySuccess:"ادرس با موفقیت کپی شد.",
      confirmPhoneNumberSuccess:"شماره موبایل با موفقیت تایید شد.",
      confirmPhoneNumberNotDonePleaseRegisterAgain:"عملیات تایید شماره تلفن انجام نشد لطفا دوباره ثبت نام کنید!",
    }
    ,
    auth: {
      forgetPasswordSendSuccess:"رمز با موفقیت به سیم کارت شما ارسال شد."
    },
},
  setting:{
    auth:{
      secondEndCode:"90"
    }
  }
}
