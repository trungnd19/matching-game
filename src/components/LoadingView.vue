<template>
    <!-- <div class="loading">Loading&#8230;</div> -->
    <div class="loading">
        <div class="loader box-rotation"></div>
    </div>
</template>
<style scoped>
/* Absolute Center Spinner */
.loading {
    position: fixed;
    z-index: 999;
    height: 2em;
    width: 2em;
    overflow: visible;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
}

/* Transparent Overlay */
.loading:before {
    content: '';
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(3, 3, 3, 1); /* Transparent black background */
}

/*
The loaders use CSS custom properties (variables) to control the attributes of the loaders
*/
:root{
	--loader-width: 70px;
	--loader-height: 70px;
	--loader-color-primary: #27ae60;
	--loader-color-secondary: #eee;
	--line-width: 3px;
	--animation-duration: 2s;
	--loader-initial-scale: 0.1;
}
.loader,.loader:before,.loader:after{
	box-sizing: border-box;
	flex-grow: 0;
	flex-shrink: 0;
}
/*
In order to get optimal results, please only change the 
variables above and don't change anything in the actual loader code
*/
	
@keyframes rect-rotate {
  0% {
    transform: rotate(0); 
  }
  50%, 100% {
    transform: rotate(360deg); 
  } 
}

@keyframes fill-rect {
  0%, 50% {
    height: 0px; 
  }
  100% {
    
    height: inherit; 
  } 
}

.loader.box-rotation {
  transform-origin: center center;
  color: var(--loader-color-primary, #27ae60);
  width: var(--loader-width, 100px);
  height: var(--loader-height, 100px);
  position: relative;
  border: var(--line-width, 4px) solid;
  display: inline-block;
  animation: rect-rotate var(--animation-duration, 1s)  linear infinite; 
}

.loader.box-rotation::after {
  content: "";
  height: 0px;
  width: 100%;
  height:100%;
  display: block;
  background: var(--loader-color-primary, #27ae60);
  opacity: 0.5;
  animation: fill-rect var(--animation-duration, 1s) linear infinite; 
}

</style>