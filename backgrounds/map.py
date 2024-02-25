from PIL import Image
import json

# Open the image file
img = Image.open('stage1-pix.png')

# Convert the image to RGBA (Red, Green, Blue, Alpha)
img = img.convert('RGBA')

# Initialize an empty list to store the coordinates and widths
pairs = []

# Set the scale factor
scale_factor = 4

# Set the height
h = 20

# Iterate over each line in the image
for y in range(img.height):
    # Initialize a variable to store the previous non-transparent pixel's x-coordinate
    prev_x = -1
    prev_y = -1
    # Iterate over each pixel on the current line
    for x in range(img.width):
        # Get the RGBA values of the pixel
        r, g, b, a = img.getpixel((x, y))
        # If the pixel is not transparent (i.e. alpha value is not 0)
        if a != 0:
            # If this is the first non-transparent pixel on the line
            if prev_x == -1:
                # Set the previous non-transparent pixel's x-coordinate to the current x-coordinate
                prev_x = x
                prev_y = y
            # If this is not the first non-transparent pixel on the line
            else:
                # Calculate the distance between the two pixels
                dist = x - prev_x
                # Add the coordinates and width to the list with the scale factor
                pairs.append({'x': prev_x * scale_factor, 'y': (prev_y * scale_factor) - 102, 'w': dist * scale_factor, 'h': h})
                # Reset the previous non-transparent pixel's x-coordinate
                prev_x = -1
                prev_y = -1

# Convert the list to a JSON string
json_str = json.dumps([dict(item) for item in pairs], separators=(',', ':'))

# Print the JSON string to the screen
print(json_str)

