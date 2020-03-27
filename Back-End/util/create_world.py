from django.contrib.auth.models import User
from adventure.models import Player, Room
from util.sample_generator import World



world = World()
world.generate_rooms(23, 23, 529)

cache = {}



for i in world.grid:
  for j in i:
    room = Room(title = j.name, description = f'This room is called {j.name} its ID is {j.id}', x = j.x, y = j.y)
    room.save()
    cache[(j.x, j.y)] = room
    if j.e_to != None:
        if (j.e_to.x, j.e_to.y) in cache:
            room.connectRooms(cache[(j.e_to.x, j.e_to.y)], 'e')
            cache[(j.e_to.x, j.e_to.y)].connectRooms(room, 'w')
    if j.w_to != None:
        if (j.w_to.x, j.w_to.y) in cache:
            room.connectRooms(cache[(j.w_to.x, j.w_to.y)], 'w')
            cache[(j.w_to.x, j.w_to.y)].connectRooms(room, 'e')
    if j.s_to != None:
        if (j.s_to.x, j.s_to.y) in cache:
            room.connectRooms(cache[(j.s_to.x, j.s_to.y)], 's')
            cache[(j.s_to.x, j.s_to.y)].connectRooms(room, 'n')
    if j.n_to != None:
        if (j.n_to.x, j.n_to.y) in cache:
            room.connectRooms(cache[(j.n_to.x, j.n_to.y)], 'n')
            cache[(j.n_to.x, j.n_to.y)].connectRooms(room, 's')

players = Player.objects.all()
first_room = world.grid[0][0]
for p in players:
  p.currentRoom = first_room.id
  p.save()

# world.print_rooms()
# print(first_layer)

# n = open('./util/names.txt', 'r', encoding='utf-8')
# names = n.read().split("\n")
# n.close()
# Room.objects.all().delete()

# r_outside = Room(title="Outside Cave Entrance",
#                description="North of you, the cave mount beckons")

# r_foyer = Room(title="Foyer", description="""Dim light filters in from the south. Dusty
# passages run north and east.""")

# r_overlook = Room(title="Grand Overlook", description="""A steep cliff appears before you, falling
# into the darkness. Ahead to the north, a light flickers in
# the distance, but there is no way across the chasm.""")

# r_narrow = Room(title="Narrow Passage", description="""The narrow passage bends here from west
# to north. The smell of gold permeates the air.""")

# r_treasure = Room(title="Treasure Chamber", description="""You've found the long-lost treasure
# chamber! Sadly, it has already been completely emptied by
# earlier adventurers. The only exit is to the south.""")

# r_outside.save()
# r_foyer.save()
# r_overlook.save()
# r_narrow.save()
# r_treasure.save()

# # Link rooms together
# r_outside.connectRooms(r_foyer, "n")
# r_foyer.connectRooms(r_outside, "s")

# r_foyer.connectRooms(r_overlook, "n")
# r_overlook.connectRooms(r_foyer, "s")

# r_foyer.connectRooms(r_narrow, "e")
# r_narrow.connectRooms(r_foyer, "w")

# r_narrow.connectRooms(r_treasure, "n")
# r_treasure.connectRooms(r_narrow, "s")

# players= Player.objects.all()
# for p in players:
#   p.currentRoom = r_outside.id
#   p.save()
