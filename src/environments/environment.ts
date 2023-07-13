export const environment={
  production: false,
  storage:{
    otherUserPhoneNumberForChat:"otherUserPhoneNumberForChat",
    groupName:"groupName",
    myPhoneNumber:"myPhoneNumber",
    myPhoneNumberForAuth:"myPhoneNumberForAuth",
    userToken:"userToken",
  },
  messages:{
    common:{
      pleaseEnterSite:"لطفا ابتدا وارد سایت شوید.",
      messageEmpty:"پیام شما خالی است! ",
      failedConnectionChatHub:"ارتباط برای چت برقرار نشد!",
      doYouWantToExit:"ایا میخاهید خارج شوید؟",
      registerSuccess:"ثبت نام موفقیت انجام شد.",
      loginSuccess:"ورود با موفقیت انجام شد.",
      doYouWantToCancelSendThisPicture:"ایا میخاهید فرستا دن این عکس را کنسل کنید؟",
      addressCopySuccess:"ادرس با موفقیت کپی شد.",
      confirmPhoneNumberSuccess:"شماره موبایل با موفقیت تایید شد.",
      confirmPhoneNumberNotDonePleaseRegisterAgain:"عملیات تایید شماره تلفن انجام نشد لطفا دوباره ثبت نام کنید!",
    },
    auth: {
      forgetPasswordSendSuccess:"رمز با موفقیت به سیم کارت شما ارسال شد."
    },
    favorite:{
      pleaseInter:"لطفا وارد اکانت خود شوید.",
      favoriteAddSuccess:"این محصول به علاقه مندی شما اضاف شد.",
      favoriteDeleteSuccess:"این محصول از علاقه مندی شما حذف شد.",
      doYouWantToDeleteFavorite:"ایا میخاهید این محصول را از لیست علاقع مندی هایتان پاک کنید؟"
    }
},
  setting:{
    auth:{
      secondEndCode:"90"
    },
    type:{
      typeMatherIndex:"00000000-0000-0000-0000-000000000000",
    },
    product:{
      sortThumbnail:"1",
      addLoadNumber:"5",
    },
    url:{
      backendUrl:'http://localhost:9001/api',
      backendUrlUser:'http://localhost:9001/api/User',
      backendUrlPicture:'http://localhost:9001/',
      hubUrl:"http://localhost:9001/hubs",
      chatHubUrl:"http://localhost:9001/hubs/chat",
    }
  },
  role:{
    product:{
      thumbnail:1,
      sliderStart:2,
      sliderEnd:10,
    },
    store:{
      thumbnail:1,
      sliderStart:2,
      sliderEnd:10,
    }
  }
}
