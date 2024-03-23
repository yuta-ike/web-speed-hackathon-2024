
for file in ./workspaces/server/seeds/images/*.{jpg,png}
do
    # ffmpeg -i $file -vf "scale=144:144:force_original_aspect_ratio=increase,crop=144:144"  "${file%.*}_96.webp"
    # ffmpeg -i $file -vf "scale=48:48:force_original_aspect_ratio=increase,crop=48:48"  "${file%.*}_32.webp"
    # ffmpeg -i $file -vf "scale=96:96:force_original_aspect_ratio=increase,crop=96:96"  "${file%.*}_64.webp"
    ffmpeg -i $file -vf "scale=192:192:force_original_aspect_ratio=increase,crop=192:192"  "${file%.*}_128.webp"
    # ffmpeg -i $file -vf "scale=288:192:force_original_aspect_ratio=increase,crop=288:192"  "${file%.*}_rect_192.webp"
    # ffmpeg -i $file -vf "scale=288:384:force_original_aspect_ratio=increase,crop=288:384"  "${file%.*}_rect_lg.webp"
done

