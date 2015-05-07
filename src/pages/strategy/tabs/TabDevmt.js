var TabDevmt = {
	active: false,
	
	init :function(){
		if(this.active) return false; this.active = true;
		
		app.Player.load();
	},
	
	show :function(){
		// Get pagination
		app.Logging.count_devmt(function(NumRecords){
			var itemsPerPage = 25;
			var numPages = Math.ceil(NumRecords/itemsPerPage);
			
			var pageCtr, pageBox;
			for(pageCtr=0; pageCtr<numPages; pageCtr++){
				pageBox = $(".page_devmt .factory .build_page").clone().appendTo(".page_devmt .build_pages");
				pageBox.text(pageCtr+1);
			}
			
			$(".page_devmt .build_pages .build_page").on("click", function(){
				$(".page_devmt .build_page").removeClass("active");
				$(this).addClass("active");
				PageTabs.devmt.showPage( $(this).text() );
			});
			
			$(".page_devmt .build_pages .build_page").first().click();
		});
	},
	
	showPage :function(pageNumber){
		console.log("showPage()", pageNumber);
		app.Logging.get_devmt(pageNumber, function(response){
			console.log("response", response);
			$(".page_devmt .build_list").html("")
			
			var ctr, thisBuild, buildbox, MasterItem;
			for(ctr in response){
				thisBuild = response[ctr];
				MasterItem = app.Master.slotitem(thisBuild.result);
				
				buildbox = $(".page_devmt .factory .build_item").clone().appendTo(".page_devmt .build_list");
				
				$(".build_id", buildbox).text( thisBuild.id );
				$(".build_ficon img", buildbox).attr("src", app.Assets.shipIcon(thisBuild.flag) );
				$(".build_flag", buildbox).text( app.Master.ship(thisBuild.flag).english );
				
				$(".build_rsc1", buildbox).text( thisBuild.rsc1 );
				$(".build_rsc2", buildbox).text( thisBuild.rsc2 );
				$(".build_rsc3", buildbox).text( thisBuild.rsc3 );
				$(".build_rsc4", buildbox).text( thisBuild.rsc4 );
				
				
				$(".build_ricon img", buildbox).attr("src", "../../assets/img/items/"+MasterItem.api_type[3]+".png");
				$(".build_result", buildbox).text( MasterItem.english );
				$(".build_time", buildbox).text( new Date(thisBuild.time*1000).format("mmm dd, yy - hh:MM tt") );
			}
		});
		
		
	}
};