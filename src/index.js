/**
 * @author jonesjonathan / www.github.com/jonesjonathan
*/

// Converts from degrees to radians.
Math.radians = function(degrees) {
    return degrees * Math.PI / 180;
};
   
// Converts from radians to degrees.
Math.degrees = function(radians) {
    return radians * 180 / Math.PI;
};

//Cube composed of planar sides
class PartialCube extends THREE.Group {
    constructor(position, sides)
    {
        super();

        let box = new THREE.Mesh(new THREE.BoxGeometry(0.99, 0.99, 0.99), new THREE.MeshBasicMaterial({color : 0x000000}))
        box.position.copy(position);
        this.add(box);

        var geometry, material, mesh;
        geometry = new THREE.PlaneGeometry(1,1);

        if(sides.pos_y)
        {
            mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color : 0xffffff, map : defaultTex}));
            mesh.rotateX(Math.radians(-90));
            mesh.position.addVectors(position, new THREE.Vector3(0, 0.5, 0));
            mesh.name = "+y";
            this.add(mesh);
        }
        if(sides.pos_x)
        {
            mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color : 0xffffff, map : defaultTex}));
            mesh.rotateY(Math.radians(90));
            mesh.position.addVectors(position, new THREE.Vector3(0.5, 0, 0));
            mesh.name = "+x";
            this.add(mesh);        
        }
        if(sides.pos_z)
        {
            mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color : 0xffffff, map : defaultTex}));
            mesh.position.addVectors(position, new THREE.Vector3(0, 0, 0.5));
            mesh.name = "+z";
            this.add(mesh);        
        }
        if(sides.neg_y)
        {
            mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color : 0xffffff, map : defaultTex}));
            mesh.rotateX(Math.radians(90));
            mesh.position.addVectors(position, new THREE.Vector3(0, -0.5, 0));
            mesh.name = "-y";
            this.add(mesh);        
        }
        if(sides.neg_x)
        {
            mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color : 0xffffff, map : defaultTex}));
            mesh.rotateY(Math.radians(-90));
            mesh.position.addVectors(position, new THREE.Vector3(-0.5, 0, 0));
            mesh.name = "-x";
            this.add(mesh);        
        }
        if(sides.neg_z)
        {
            mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color : 0xffffff, map : defaultTex}));
            mesh.rotateY(Math.radians(180));
            mesh.position.addVectors(position, new THREE.Vector3(0, 0, -0.5));
            mesh.name = "-z";
            this.add(mesh);        
        }
    }
}

//How 
//Supergroup containing a collection of partial cubes separated by 1% distance of eachother to form a rubix cube
class Rubiks extends THREE.Group {
    constructor()
    {
        super();
        //Left, middle, right
        this.left = [
            [
                new PartialCube(new THREE.Vector3(-1.01, 1.01, -1.01), {pos_y : true, neg_z : true, neg_x : true}),
                new PartialCube(new THREE.Vector3(-1.01, 0, -1.01), {neg_z : true, neg_x : true}),
                new PartialCube(new THREE.Vector3(-1.01, -1.01, -1.01), {neg_z : true, neg_x : true, neg_y : true})
            ],
            [
                new PartialCube(new THREE.Vector3(-1.01, 1.01, 0), {pos_y : true, neg_x : true}),
                new PartialCube(new THREE.Vector3(-1.01, 0, 0), {neg_x : true}),
                new PartialCube(new THREE.Vector3(-1.01, -1.01, 0), {neg_x : true, neg_y : true})
            ],
            [
                new PartialCube(new THREE.Vector3(-1.01, 1.01, 1.01), {pos_y : true, pos_z : true, neg_x : true}),
                new PartialCube(new THREE.Vector3(-1.01, 0, 1.01), {pos_z : true, neg_x : true}),
                new PartialCube(new THREE.Vector3(-1.01, -1.01, 1.01), {pos_z : true, neg_x : true, neg_y : true})
            ],
        ]

        this.middle = [
            [
                new PartialCube(new THREE.Vector3(0, 1.01, -1.01), {pos_y : true, neg_z : true}),
                new PartialCube(new THREE.Vector3(0, 0, -1.01), {neg_z : true}),
                new PartialCube(new THREE.Vector3(0, -1.01, -1.01), {neg_z : true, neg_y : true})
            ],
            [
                new PartialCube(new THREE.Vector3(0, 1.01, 0), {pos_y : true}),
                null,
                new PartialCube(new THREE.Vector3(0, -1.01, 0), {neg_y : true})
            ],
            [
                new PartialCube(new THREE.Vector3(0, 1.01, 1.01), {pos_y : true, pos_z : true}),
                new PartialCube(new THREE.Vector3(0, 0, 1.01), {pos_z : true}),
                new PartialCube(new THREE.Vector3(0, -1.01, 1.01), {pos_z : true, neg_y : true})
            ],
        ]

        this.right = [
            [
                new PartialCube(new THREE.Vector3(1.01, 1.01, -1.01), {pos_y : true, neg_z : true, pos_x : true}),
                new PartialCube(new THREE.Vector3(1.01, 0, -1.01), {neg_z : true, pos_x : true}),
                new PartialCube(new THREE.Vector3(1.01, -1.01, -1.01), {neg_z : true, pos_x : true, neg_y : true})
            ],
            [
                new PartialCube(new THREE.Vector3(1.01, 1.01, 0), {pos_y : true, pos_x : true}),
                new PartialCube(new THREE.Vector3(1.01, 0, 0), {pos_x : true}),
                new PartialCube(new THREE.Vector3(1.01, -1.01, 0), {pos_x : true, neg_y : true})
            ],
            [
                new PartialCube(new THREE.Vector3(1.01, 1.01, 1.01), {pos_y : true, pos_z : true, pos_x : true}),
                new PartialCube(new THREE.Vector3(1.01, 0, 1.01), {pos_z : true, pos_x : true}),
                new PartialCube(new THREE.Vector3(1.01, -1.01, 1.01), {pos_z : true, pos_x : true, neg_y : true})
            ],
        ]

        //Add all cubes to group
        for(let i = 0; i < 3; i++)
        {
            for(let k = 0; k < 3; k++)
            {
                this.add(this.left[i][k]);
                if(i != 1 || k != 1) //Center
                    this.add(this.middle[i][k]);
                this.add(this.right[i][k]);
            }
        }
    }

    //Visually rotate the LEFT section about central cube axis
    rotateLeft(radians)
    {
        for(let i = 0; i < 3; i++)
        {
            for(let k = 0; k < 3; k++)
            {
                this.left[i][k].rotateX(radians);
            }
        }
    }

    rotateMiddleAboutX(radians)
    {
        for(let i = 0; i < 3; i++)
        {
            for(let k = 0; k < 3; k++)
            {
                if(i != 1 || k != 1)
                {
                    this.middle[i][k].rotateX(radians);
                }
            }
        }
    }

    rotateRight(radians)
    {
        for(let i = 0; i < 3; i++)
        {
            for(let k = 0; k < 3; k++)
            {
                this.right[i][k].rotateX(radians);
            }
        }
    }

    //Visually rotate the TOP section about central cube axis
    rotateTop(radians)
    {
        for(let i = 0; i < 3; i++)
        {
            this.left[i][0].rotateY(radians);
            this.middle[i][0].rotateY(radians);
            this.right[i][0].rotateY(radians);
        }
    }

    rotateMiddleAboutY(radians)
    {
        for(let i = 0; i < 3; i++)
        {
            this.left[i][1].rotateY(radians);
            if(i != 1)
                this.middle[i][1].rotateY(radians);
            this.right[i][1].rotateY(radians);
        }
    }
    
    rotateBottom(radians)
    {
        for(let i = 0; i < 3; i++)
        {
            this.left[i][2].rotateY(radians);
            this.middle[i][2].rotateY(radians);
            this.right[i][2].rotateY(radians);
        }
    }

    rotateBack(radians)
    {
        for(let i = 0; i < 3; i++)
        {
            this.left[0][i].rotateZ(radians);
            this.middle[0][i].rotateZ(radians);
            this.right[0][i].rotateZ(radians);
        }
    }

    rotateMiddleAboutZ(radians) 
    {
        for(let i = 0; i < 3; i++)
        {
            this.left[1][i].rotateZ(radians);
            if(i != 1)
                this.middle[1][i].rotateZ(radians);
            this.right[1][i].rotateZ(radians);
        }
    }

    rotateFront(radians)
    {
        for(let i = 0; i < 3; i++)
        {
            this.left[2][i].rotateZ(radians);
            this.middle[2][i].rotateZ(radians);
            this.right[2][i].rotateZ(radians);
        }
    }
};

var debug = false;

//Three variables
var scene, camera, renderer, cameraControls;
var Xtex, Otex, defaultTex;
var RubiksCube;

var raycaster = new THREE.Raycaster();

var mouse = new THREE.Vector2();
var selection = null;
var mouseLeftDown = false, mouseLeftUp = true;

var xTurn = true;

function init()
{
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffcc);

    camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 2000);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight); //CHANGE RESOLUTION BASED ON WINDOW SIZE HERE
    document.body.appendChild(renderer.domElement);

    let loader = new THREE.TextureLoader();
    let texLoadCount = 0;
    Xtex        = loader.load('src/textures/X.png', onLoad);
    Otex        = loader.load('src/textures/O.png', onLoad);
    defaultTex  = loader.load('src/textures/Default.png', onLoad);
    defaultTex.name = "default";

    initControls();
    camera.position.set( 0, 0, 5 );

    //Waits for all textures to load
    function onLoad()
    {
        if(++texLoadCount != 3)
            return;

        RubiksCube = new Rubiks();
        scene.add(RubiksCube);

        window.addEventListener('resize', onWindowResize, false);
        window.addEventListener( 'mousemove', onMouseMove, false );
        window.addEventListener( 'mouseup', onMouseUp, false)
        window.addEventListener('mousedown', onMouseDown, false);

        animate();
    }
}



function initControls()
{
    //ORBIT CameraControls
    cameraControls = new THREE.OrbitControls( camera );  
    cameraControls.enablePan = false;
    cameraControls.enableDamping = true;
    cameraControls.enableZoom = false;
    cameraControls.dampingFactor = 0.1;
    cameraControls.rotateSpeed = 0.05;
}

function animate()
{
    requestAnimationFrame(animate);
    cameraControls.update();
    renderer.render(scene, camera);
}

function onMouseMove( event ) {

    if(mouseLeftDown && !selection)
        return;

	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    
    // update the picking ray with the camera and mouse position
	raycaster.setFromCamera( mouse, camera );

	// calculate objects intersecting the picking ray
	var intersects = raycaster.intersectObject( RubiksCube, true );

	if ( intersects.length > 0 ) {
        selection = intersects[0].object;
    }
    else
    {
        selection = null;
    }

}

function onMouseUp(event)
{
    if(event.which == 1)
    {
        mouseLeftUp = true;
        mouseLeftDown = false;

        //A tile has been selected for placement
        if(selection && selection.material.map.name == "default")
        {
            if(xTurn = !xTurn)
                selection.material.map = Otex;
            else
                selection.material.map = Xtex;
            
            selection.material.needsUpdate = true;
            console.log(selection);
        }
    }
    if(event.which == 3)
        console.log(selection);
}

function onMouseDown(event)
{
    if(event.which == 1) //Left click
    {
        mouseLeftDown = true;
        mouseLeftUp = false;
    }
    else if(event.which == 3 && selection) //Right click
    {
        var pos_x = false, pos_y = false, pos_z = false, neg_x = false, neg_y = false, neg_z = false;
        selection.parent.children.forEach(function(child)
        {
            console.log(child.name);
            switch(child.name)
            {
                case "+x":
                    pos_x = true;
                    break;
                case "+y":
                    pos_y = true;
                    break;
                case "+z":
                    pos_z = true;
                    break;
                case "-x":
                    neg_x = true;
                    break;
                case "-y":
                    neg_y = true;
                    break;
                case "-z":
                    neg_z = true;
                    break;
            }
        });

        var name = selection.name;
        if(name == "+z" || name == "-z") //Selected Z face
        {
            //Check relatives for proper sectional rotation
            if(neg_x && pos_y) //Top Left
            {
                 // rotateLeft or rotateTop
            }
            else if(neg_x && neg_y) //Bottom Left
            {
                // rotateLeft or rotateBottom
            }
            else if(neg_x) //Center Left
            {
                // rotateLeft or rotateMiddleAboutY
            }
            else if(pos_x & pos_y) //Top Right
            {
                // rotateRight or rotateTop
            }
            else if(pos_x && neg_y) //Bottom Right
            {
                // rotateRight or rotateBottom
            }
            else if(pos_x) //Center Right
            {
                // rotateRight or rotateMiddleAboutY
            }
            else if(pos_y) //Middle Top
            {
                // rotateMiddleAboutX or rotateTop
            }
            else if(neg_y) //Middle Bottom
            {
                // rotateMiddleAboutX or rotateBottom
            }
            else //Center
            {
                // rotateMiddleAboutX or rotateMiddleAboutY
            }
        }

        //console.log("pos_x: " + pos_x + ", pos_y: " + pos_y + ", pos_z: " + pos_z + ", neg_x: " + neg_x + ", neg_y: " + neg_y + ", neg_z: " + neg_z);
    }
}

function onWindowResize()
{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

init();