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
  },
  seo:{
    index:{
      title:"فروشگاه لباس و پوشاک کاکتوس",
      description:"فروشگاه کاکتوس اولین مجموعه چند فروشگاهی استان  یزد فروش انواع لباس زنانه لباس مردانه کیف کفش اکسسوری",
      keywords:"فروشگاه کاکتوس ,فروشگاه لباس, عسلویه, گله دار, یزد, لباس ,مردانه, زنانه, بچه گانه, پوشاک ,انلاین"
    },
    search:{
      title:"جستجو فروشگاه لباس و پوشاک کاکتوس",
      description:"در این صحفه میتوان در فروشگاه کاکتوس جستجو کرد و محصول مورد نظر را پیدا کرد",
      keywords:"فروشگاه کاکتوس ,فروشگاه لباس, عسلویه, گله دار, یزد, لباس ,مردانه, زنانه, بچه گانه, پوشاک ,انلاین,جستجو ,محصول"
    },
    store:{
      title:"مغازه های عضو فروشگاه کاکتوس",
      description:"در این صحفه میتوان فروشگاه های عضو کاکتوس رادید و فروشگاه مورد نظر را پیدا کرد",
      keywords:"فروشگاه کاکتوس ,فروشگاه لباس, عسلویه, گله دار, یزد, لباس ,مردانه, زنانه, بچه گانه, پوشاک ,انلاین,جستجو ,محصول ,مغازه ها"
    },
  },
  cache:{
    product:{
      product:"0",
      productPicture:"0",
    },
    type:{
      type:"0",
      typePicture:"0"
    },
    store:{
      store:"0",
      storePicture:"0"
    },
  }
}
