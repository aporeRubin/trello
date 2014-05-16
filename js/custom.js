var doc = document
var panels = $(".panel")
 
var draggedEntry = null 
var dropPanel = null 
$(function () {
	Array.prototype.forEach.call(panels, function(panel) {
		panel.addEventListener('dragstart', handleDragStart);
		panel.addEventListener('dragover', handleDragOver);
		panel.addEventListener('dragenter', handleDragEnter);
		panel.addEventListener('dragleave', handleDragLeave);
		panel.addEventListener('drop', handleDropOntoPane);

	});
	var entries = $(".entryRow");
	Array.prototype.forEach.call(entries, function(entryRow) {
		entryRow.addEventListener('dragstart', handleEntryDragStart);
		entryRow.addEventListener('dragover', handleEntryDragOver);
		entryRow.addEventListener('dragenter', handleEntryDragEnter);
		entryRow.addEventListener('dragleave', handleEntryDragLeave);
		entryRow.addEventListener('drop', handleEntryDropOntoPane);
		entryRow.addEventListener('dragend',handleEntryDragEnd);
	});
});

var handleDragStart = function(e){
	
}

var handleDragOver = function(e){
	if (e.preventDefault) {
        e.preventDefault();
    }
    
    return false ;
}

var handleDragEnter = function(e){
	if (e.preventDefault) {
        e.preventDefault();
    }
   
    dropPanel = this ;
    return false ;	
}

var handleDragLeave = function(e){
	var dropOnPanel = this
	if (e.preventDefault) {
        e.preventDefault();
    }
   
    return false ;
}
var handleDropOntoPane = function(e){
	if (e.preventDefault) {
        e.preventDefault();
    }
    
    var draggedEntryParent =  getParentPanel(draggedEntry) 
	$(draggedEntry).detach()
    
    $(dropPanel).append($(draggedEntry))
 	dropPanel = null 
    return false ;
}




var handleEntryDragStart = function(e){
	
	draggedEntry = $(this).get(0)
    
    var draggedEntryParent = getParentPanel(draggedEntry)
    
    $(draggedEntryParent).addClass("removedFromPanel")
    $(draggedEntry).addClass("entryRowDragged")
    Array.prototype.forEach.call(panels, function(panel){
    	
    	if(panel.id != draggedEntryParent.id ){
    		$(panel).addClass("dropAblePanel");
    	}

    })
    return false ;
}

var handleEntryDragOver = function(e){
	
}

var handleEntryDragEnter = function(e){
	var parentPanel = getParentPanel( this )
	$(parentPanel).trigger("dragenter")
}

var handleEntryDragLeave = function(e){
	var dropOnPanel = this
	if (e.preventDefault) {
        e.preventDefault();
    }

    var parentPanel = getParentPanel( this )
	$(parentPanel).trigger("dragleave")
    return false ;
}
var handleEntryDropOntoPane = function(e){
	if (e.preventDefault) {
        e.preventDefault();
    }


    var parentPanel = getParentPanel( this )
	
	$(parentPanel).trigger("drop")
    return false ;
}
var handleEntryDragEnd = function(e){
	if (e.preventDefault) {
        e.preventDefault();
    }

    Array.prototype.forEach.call(panels, function(panel){
    	$(panel).removeClass("dropAblePanel");
    	$(panel).removeClass("removedFromPanel"); 

    })
    $(draggedEntry).removeClass("entryRowDragged")
    return false ;
}


//helper
var getParentPanel = function(entryRow){
	return $(entryRow).parent(".panel").get(0)
}
