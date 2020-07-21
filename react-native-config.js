module.exports = {
    dependencies: {
      "react-native-sqlite-storage": {
        platforms: {
          android: {
            //sourceDir:
              //"../node_modules/react-native-sqlite-storage/platforms/android-native",
              sourceDir: './lib/android',
            packageImportPath: "import io.liteglue.SQLitePluginPackage;",
            packageInstance: "new SQLitePluginPackage()"
          }
        }
      }
    }
  };