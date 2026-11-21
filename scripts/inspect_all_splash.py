from PIL import Image

for path in [
    'android/app/src/main/res/drawable/splash.png',
    'android/app/src/main/res/drawable-port-hdpi/splash.png',
    'android/app/src/main/res/drawable-port-mdpi/splash.png',
    'android/app/src/main/res/drawable-port-xhdpi/splash.png',
    'android/app/src/main/res/drawable-port-xxhdpi/splash.png',
    'android/app/src/main/res/drawable-port-xxxhdpi/splash.png'
]:
    im = Image.open(path)
    print(path, im.size)
