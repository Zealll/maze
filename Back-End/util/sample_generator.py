# Sample Python code that can be used to generate rooms in
# a zig-zag pattern.
#
# You can modify generate_rooms() to create your own
# procedural generation algorithm and use print_rooms()
# to see the world.
import random
n = open('./util/names.txt', 'r', encoding='utf-8')
names = n.read().split("\n")
n.close()


class Room:
    def __init__(self, id, name, description, x, y):
        self.id = id
        self.name = name
        self.description = description
        self.n_to = None
        self.s_to = None
        self.e_to = None
        self.w_to = None
        self.x = x
        self.y = y
    def __repr__(self):
        if self.e_to is not None:
            return f"({self.x}, {self.y}) -> ({self.e_to.x}, {self.e_to.y})"
        return f"({self.x}, {self.y})"
    def connect_rooms(self, connecting_room, direction):
        '''
        Connect two rooms in the given n/s/e/w direction
        '''
        reverse_dirs = {"n": "s", "s": "n", "e": "w", "w": "e"}
        reverse_dir = reverse_dirs[direction]
        setattr(self, f"{direction}_to", connecting_room)
        setattr(connecting_room, f"{reverse_dir}_to", self)
    def get_room_in_direction(self, direction):
        '''
        Connect two rooms in the given n/s/e/w direction
        '''
        return getattr(self, f"{direction}_to")


# definesa helper function for use in generating rooms
def branch_rooms(grid,
                 current_location,
                 current_room,
                 current_rooms,
                 max_rooms,
                 max_width,
                 max_height,
                 branch_from
                 ):

    # gets coordinates for possible next locations from current room
    north = current_location.copy()
    north[1] += 1
    north += ['n']
    east = current_location.copy()
    east[0] += 1
    east += ['e']
    south = current_location.copy()
    south[1] -= 1
    south += ['s']
    west = current_location.copy()
    west[0] -= 1
    west += ['w']

    # adds possible locations to a list
    possible_next = [north, east, south, west]

    # brings in global variable for list of names
    global names

    for room in possible_next:
        # passes if room is out of bounds
        if (room[0] < 0) or (room[1] < 0) or (room[0] > max_width - 1) or (room[1] > max_height - 1):  # noqa
            pass

        # passes if room already exists in grid
        elif grid[room[0]][room[1]] is not None:
            pass

        # creates new room at given location otherwise
        else:
            if current_rooms == max_rooms:
                pass
            else:
                current_rooms += 1
                name = random.choice(names)
                new_room = Room(current_rooms,
                                f'{name}',
                                f'Just a generic room named {name}',
                                room[0],
                                room[1]
                                )
                current_room.connect_rooms(new_room, room[2])
                grid[room[0]][room[1]] = new_room
                branch_from.append(new_room)

    return(grid, current_rooms, branch_from)


class World:
    def __init__(self):
        self.grid = None
        self.width = 0
        self.height = 0
    def generate_zigzag(self, size_x, size_y, num_rooms):
        '''
        Fill up the grid, bottom to top, in a zig-zag pattern
        '''

        # Initialize the grid
        self.grid = [None] * size_y
        self.width = size_x
        self.height = size_y
        for i in range( len(self.grid) ):
            self.grid[i] = [None] * size_x

        # Start from lower-left corner (0,0)
        x = -1 # (this will become 0 on the first step)
        y = 0
        room_count = 0

        # Start generating rooms to the east
        direction = 1  # 1: east, -1: west


        # While there are rooms to be created...
        previous_room = None
        while room_count < num_rooms:

            # Calculate the direction of the room to be created
            if direction > 0 and x < size_x - 1:
                room_direction = "e"
                x += 1
            elif direction < 0 and x > 0:
                room_direction = "w"
                x -= 1
            else:
                # If we hit a wall, turn north and reverse direction
                room_direction = "n"
                y += 1
                direction *= -1

            # Create a room in the given direction
            global names
            global count_nums
            random_name = random.choice(names)
            room = Room(room_count, random_name, "This is a generic room.", x, y)
            # Note that in Django, you'll need to save the room after you create it
            # self.save()
            # Save the room in the World grid
            self.grid[y][x] = room

            # Connect the new room to the previous room
            if previous_room is not None:
                previous_room.connect_rooms(room, room_direction)

            # Update iteration variables
            previous_room = room
            room_count += 1

    def generate_rooms(self, width, height, num_rooms):
        # sets grid and size
        self.grid = [None] * width
        self.width = width
        self.height = height
        for i in range(len(self.grid)):
            self.grid[i] = [None] * height

        # creates the starting room at bottom left
        start_room = Room(1, 'START ROOM', "This is the starting room", 0, 0)
        self.grid[0][0] = start_room
        current_rooms = 1
        current_location = [0, 0]

        current_room = start_room
        max_rooms = 529
        branch_from = []

        while current_rooms < max_rooms:

            self.grid, current_rooms, branch_from = branch_rooms(self.grid,
                                                                 current_location,  # noqa
                                                                 current_room,
                                                                 current_rooms,
                                                                 max_rooms,
                                                                 self.width,
                                                                 self.height,
                                                                 branch_from)
            if branch_from:
                current_room = branch_from.pop(random.randrange(len(branch_from)))  # noqa
                current_location = [current_room.x, current_room.y]
            else:
                break


    def print_rooms(self):
        '''
        Print the rooms in room_grid in ascii characters.
        '''

        # Add top border
        str = "# " * ((3 + self.width * 5) // 2) + "\n"

        # The console prints top to bottom but our array is arranged
        # bottom to top.
        #
        # We reverse it so it draws in the right direction.
        reverse_grid = list(self.grid) # make a copy of the list
        reverse_grid.reverse()
        for row in reverse_grid:
            print(row)
            # PRINT NORTH CONNECTION ROW
            str += "#"
            for room in row:
                if room is not None and room.n_to is not None:
                    str += "  |  "
                else:
                    str += "     "
            str += "#\n"
            # PRINT ROOM ROW
            str += "#"
            for room in row:
                if room is not None and room.w_to is not None:
                    str += "-"
                else:
                    str += " "
                if room is not None:
                    str += f"{room.id}".zfill(3)
                else:
                    str += "   "
                if room is not None and room.e_to is not None:
                    str += "-"
                else:
                    str += " "
            str += "#\n"
            # PRINT SOUTH CONNECTION ROW
            str += "#"
            for room in row:
                if room is not None and room.s_to is not None:
                    str += "  |  "
                else:
                    str += "     "
            str += "#\n"

        # Add bottom border
        str += "# " * ((3 + self.width * 5) // 2) + "\n"

        # Print string
        print(str)


w = World()
num_rooms = 44
width = 8
height = 7
w.generate_rooms(width, height, num_rooms)
w.print_rooms()


print(f"\n\nWorld\n  height: {height}\n  width: {width},\n  num_rooms: {num_rooms}\n")  # noqa
