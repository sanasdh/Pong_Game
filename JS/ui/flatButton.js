class FlatButton extends Phaser.GameObjects.Container
{
	constructor(config)
	{
		if (!config.scene)
		{
			return;
		}
		if (!config.key)
		{
			return;
		}
		super(config.scene);

		this.config=config;
		this.scene=config.scene;
		this.back=this.scene.add.image(0,0,config.key);

		this.add(this.back);

		if (config.text)
		{
			if (config.textConfig)
			{
				this.text1=this.scene.add.text(0,0,config.text,config.textConfig,{
					font: "24px 'VT323'",
					fill:"white",
					align: "center"
				});
			}
			else
			{
				this.text1=this.scene.add.text(0,0,config.text,{
					font: "24px 'VT323'",
					fill:"white",
					align: "center"
				});;
			}
			
			this.text1.setOrigin(0.5,0.5);
			this.add(this.text1);
		}
		if (config.x)
		{
			this.x=config.x;
		}
		if (config.y)
		{
			this.y=config.y;
		}

		this.scene.add.existing(this);


		if (config.event)
		{
			this.back.setInteractive();
			this.back.on('pointerdown',this.pressed,this)
		}
	}
	over()
	{
		this.y-=5;
	}
	out()
	{
		this.y+=5;
	}
	pressed()
	{
		if (this.config.params)
		{
			emitter.emit(this.config.event,this.config.params);
		}
		else
		{
			emitter.emit(this.config.event);
		}
		
	}
}