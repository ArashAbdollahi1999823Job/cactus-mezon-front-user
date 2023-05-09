export const environment={
  production:false,
  backendUrl:'http://localhost:9001/api',
  backendUrlUser:'http://localhost:9001/api/User',
  backendUrlPicture:'http://localhost:9001',
  hubUrl:"http://localhost:9001/hubs",
  chatHubUrl:"http://localhost:9001/hubs/chat",
  storage:{
    otherUserPhoneNumberForChat:"otherUserPhoneNumberForChat",
    groupName:"groupName"
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
      failedConnectionChatHub:"ارتباط برای چت برقرار نشد"
    }
  }
}
