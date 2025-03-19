export default {
    expo: {
      name: "Lahore Basket",
      slug: "lahore-basket",
      version: "1.0.0",
      newArchEnabled: true,
      web: {
        favicon: "./assets/favicon.png",
      },
    android: {
      versionCode: 11,  
      package: "com.grycoproduction.lahorebasket"  
    },
      extra: {
        eas: {
          projectId: "7bff8ee3-580f-4a37-8bc6-49648caab61a",
        },
        apiBaseUrl:
        process.env.APP_ENV === "production"
          ? "https://api.g3studio.co"  
          : "https://api.g3studio.co",
      },
    },
  };