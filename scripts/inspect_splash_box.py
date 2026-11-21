from PIL import Image

def inspect_img(path):
    im = Image.open(path)
    bbox = im.getbbox()
    print(f"{path}: size={im.size}, bbox={bbox}")
    if bbox:
        w = bbox[2] - bbox[0]
        h = bbox[3] - bbox[1]
        print(f"Content width={w} ({w/im.size[0]*100:.1f}%), height={h} ({h/im.size[1]*100:.1f}%)")

inspect_img('android/app/src/main/res/drawable/splash_icon.png')
inspect_img('android/app/src/main/res/drawable/splash_logo.png')
