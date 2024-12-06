image_list = []
for i in range(1,23):
    for j in range(1,5):
        for k in range(1,23):
            for l in range(1,5):                  
                with open(f'img{i+1}_{j+1}', 'rb') as img1:
                    with open(f'img{k+1}_{l+1}', 'rb') as img2:
                        # Compare the binary contents
                        while True:
                            chunk1 = img1.read(4096)  # Read chunks to handle large files efficiently
                            chunk2 = img2.read(4096)
                            
                            # If both chunks are empty, end of files is reached, and they are identical
                            if not chunk1 and not chunk2:
                                

# Example usage (comment out when using the function in another script)
# identical = are_images_identical('image1.png', 'image2.png')
# print(f"Are the images identical? {identical}")
